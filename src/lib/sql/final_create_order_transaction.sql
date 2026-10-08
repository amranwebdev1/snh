DROP FUNCTION IF EXISTS public.create_order_transaction(
  uuid,
  text,
  jsonb,
  text,
  boolean,
  text
);


CREATE OR REPLACE FUNCTION public.create_order_transaction(
  p_address_id uuid,
  p_payment_method text,
  p_items jsonb,
  p_customer_note text DEFAULT NULL,
  p_is_buy_now boolean DEFAULT false,
  p_coupon_code text DEFAULT NULL
)
RETURNS TABLE (
  order_id uuid,
  order_number text,
  shop_id uuid,
  subtotal numeric,
  delivery_fee numeric,
  discount numeric,
  total_amount numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id uuid := auth.uid();

  v_requested_count integer := 0;
  v_found_product_count integer := 0;
  v_cart_count integer := 0;

  v_server_subtotal numeric(14,2) := 0;
  v_delivery_fee numeric(14,2) := 0;
  v_coupon_discount numeric(14,2) := 0;

  v_coupon public.coupons%ROWTYPE;

  v_now timestamptz := now();

  v_order_id uuid;
  v_order_number text;

  v_shop_count integer := 0;
  v_shop_index integer := 0;

  v_allocated_discount numeric(14,2) := 0;
  v_shop_discount numeric(14,2) := 0;
  v_shop_total numeric(14,2) := 0;

  v_product record;
  v_shop record;

BEGIN

  /* =========================================================
     1. Authentication
     ========================================================= */

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Login required';
  END IF;


  /* =========================================================
     2. Basic validation
     ========================================================= */

  IF p_address_id IS NULL THEN
    RAISE EXCEPTION
      'একটি shipping address নির্বাচন করুন।';
  END IF;


  /*
   * বর্তমানে শুধুমাত্র COD চালু।
   */
  IF p_payment_method IS NULL
     OR p_payment_method <> 'cod'
  THEN
    RAISE EXCEPTION
      'এই payment method বর্তমানে চালু নেই।';
  END IF;


  IF p_items IS NULL
     OR jsonb_typeof(p_items) <> 'array'
     OR jsonb_array_length(p_items) = 0
  THEN
    RAISE EXCEPTION
      'Order items পাওয়া যায়নি।';
  END IF;


  /* =========================================================
     3. Address ownership
     ========================================================= */

  IF NOT EXISTS (
    SELECT 1
    FROM public.addresses AS a
    WHERE a.id = p_address_id
      AND a.user_id = v_user_id
  ) THEN
    RAISE EXCEPTION
      'এই address আপনার নয় অথবা পাওয়া যায়নি।';
  END IF;


  /* =========================================================
     4. Requested order items
     ========================================================= */

  CREATE TEMP TABLE pg_temp.requested_order_items (
    product_id uuid PRIMARY KEY,
    quantity integer NOT NULL
  ) ON COMMIT DROP;


  INSERT INTO pg_temp.requested_order_items (
    product_id,
    quantity
  )
  SELECT
    (item->>'product_id')::uuid AS product_id,
    SUM(
      (item->>'quantity')::integer
    )::integer AS quantity
  FROM jsonb_array_elements(p_items) AS item
  GROUP BY
    (item->>'product_id')::uuid;


  SELECT COUNT(*)
  INTO v_requested_count
  FROM pg_temp.requested_order_items AS r;


  IF v_requested_count = 0 THEN
    RAISE EXCEPTION
      'Valid product পাওয়া যায়নি।';
  END IF;


  /* =========================================================
     5. Quantity validation
     ========================================================= */

  IF EXISTS (
    SELECT 1
    FROM pg_temp.requested_order_items AS r
    WHERE r.quantity <= 0
  ) THEN
    RAISE EXCEPTION
      'Product quantity অবশ্যই 1 বা তার বেশি হতে হবে।';
  END IF;


  /* =========================================================
     6. Normal cart checkout validation
     ========================================================= */

  IF NOT p_is_buy_now THEN

    PERFORM 1
    FROM public.cart_items AS c
    WHERE c.user_id = v_user_id
      AND c.product_id IN (
        SELECT r.product_id
        FROM pg_temp.requested_order_items AS r
      )
    FOR UPDATE;


    SELECT COUNT(*)
    INTO v_cart_count
    FROM public.cart_items AS c
    INNER JOIN pg_temp.requested_order_items AS r
      ON r.product_id = c.product_id
    WHERE c.user_id = v_user_id;


    IF v_cart_count <> v_requested_count THEN
      RAISE EXCEPTION
        'আপনার cart পরিবর্তিত হয়েছে। Checkout আবার চেষ্টা করুন।';
    END IF;


    IF EXISTS (
      SELECT 1
      FROM public.cart_items AS c
      INNER JOIN pg_temp.requested_order_items AS r
        ON r.product_id = c.product_id
      WHERE c.user_id = v_user_id
        AND c.quantity < r.quantity
    ) THEN
      RAISE EXCEPTION
        'Cart-এর একটি product quantity পরিবর্তিত হয়েছে।';
    END IF;

  END IF;


  /* =========================================================
     7. Working order items
     ========================================================= */

  CREATE TEMP TABLE pg_temp.order_items_work (
    product_id uuid PRIMARY KEY,
    shop_id uuid NOT NULL,
    product_name text NOT NULL,
    product_image text,
    quantity integer NOT NULL,
    unit_price numeric(14,2) NOT NULL,
    item_subtotal numeric(14,2) NOT NULL
  ) ON COMMIT DROP;


  /* =========================================================
     8. Fetch and lock products
     ========================================================= */

  FOR v_product IN
    SELECT
      p.id AS product_id,
      p.shop_id AS product_shop_id,
      p.name AS product_name,
      p.thumbnail AS product_thumbnail,
      p.price AS product_price,
      p.discount_price AS product_discount_price,
      p.stock AS product_stock,
      p.approval_status AS product_approval_status,
      p.status AS product_status,
      p.is_delete AS product_is_delete,
      r.quantity AS requested_quantity
    FROM pg_temp.requested_order_items AS r
    INNER JOIN public.products AS p
      ON p.id = r.product_id
    FOR UPDATE OF p
  LOOP

    v_found_product_count :=
      v_found_product_count + 1;


    /* Product approval */

    IF v_product.product_approval_status <> 'approved' THEN
      RAISE EXCEPTION
        'Product "%" এখনো approved নয়।',
        v_product.product_name;
    END IF;


    /* Product status */

    IF v_product.product_status <> 'active' THEN
      RAISE EXCEPTION
        'Product "%" বর্তমানে available নয়।',
        v_product.product_name;
    END IF;


    /* Soft delete */

    IF v_product.product_is_delete = true THEN
      RAISE EXCEPTION
        'Product "%" আর available নয়।',
        v_product.product_name;
    END IF;


    /* Shop */

    IF v_product.product_shop_id IS NULL THEN
      RAISE EXCEPTION
        'Product "%" কোনো valid shop-এর সাথে যুক্ত নয়।',
        v_product.product_name;
    END IF;


    IF NOT EXISTS (
      SELECT 1
      FROM public.shops AS s
      WHERE s.id = v_product.product_shop_id
    ) THEN
      RAISE EXCEPTION
        'Product "%" এর shop পাওয়া যায়নি।',
        v_product.product_name;
    END IF;


    /* Stock */

    IF COALESCE(v_product.product_stock, 0)
       < v_product.requested_quantity
    THEN
      RAISE EXCEPTION
        '"%" এর পর্যাপ্ত stock নেই। Available: %, Required: %',
        v_product.product_name,
        COALESCE(v_product.product_stock, 0),
        v_product.requested_quantity;
    END IF;


    /* Price */

    IF v_product.product_price IS NULL
       OR v_product.product_price < 0
    THEN
      RAISE EXCEPTION
        'Product "%" এর price invalid।',
        v_product.product_name;
    END IF;


    /* Save validated item */

    INSERT INTO pg_temp.order_items_work (
      product_id,
      shop_id,
      product_name,
      product_image,
      quantity,
      unit_price,
      item_subtotal
    )
    VALUES (
      v_product.product_id,
      v_product.product_shop_id,
      v_product.product_name,
      v_product.product_thumbnail,
      v_product.requested_quantity,

      CASE
        WHEN v_product.product_discount_price IS NOT NULL
          AND v_product.product_discount_price > 0
          AND v_product.product_discount_price < v_product.product_price
        THEN v_product.product_discount_price
        ELSE v_product.product_price
      END,

      ROUND(
        (
          CASE
            WHEN v_product.product_discount_price IS NOT NULL
              AND v_product.product_discount_price > 0
              AND v_product.product_discount_price < v_product.product_price
            THEN v_product.product_discount_price
            ELSE v_product.product_price
          END
          * v_product.requested_quantity
        ),
        2
      )
    );

  END LOOP;


  /* =========================================================
     9. Missing product check
     ========================================================= */

  IF v_found_product_count <> v_requested_count THEN
    RAISE EXCEPTION
      'এক বা একাধিক product পাওয়া যায়নি। Checkout আবার চেষ্টা করুন।';
  END IF;


  /* =========================================================
     10. Server subtotal
     ========================================================= */

  SELECT COALESCE(
    ROUND(SUM(w.item_subtotal), 2),
    0
  )
  INTO v_server_subtotal
  FROM pg_temp.order_items_work AS w;


  IF v_server_subtotal <= 0 THEN
    RAISE EXCEPTION
      'Order subtotal invalid।';
  END IF;


  /* =========================================================
     11. Delivery fee
     ========================================================= */

  v_delivery_fee := 0;


  SELECT
    dz.delivery_charge
  INTO
    v_delivery_fee
  FROM public.addresses AS a
  CROSS JOIN LATERAL public.get_delivery_zone(
    a.district,
    a.upazila
  ) AS dz
  WHERE a.id = p_address_id
    AND a.user_id = v_user_id
  LIMIT 1;


  IF v_delivery_fee IS NULL THEN
    RAISE EXCEPTION
      'এই address-এর জন্য delivery charge পাওয়া যায়নি।';
  END IF;


  /* =========================================================
     12. Coupon
     ========================================================= */

  IF p_coupon_code IS NOT NULL
     AND TRIM(p_coupon_code) <> ''
  THEN

    SELECT c.*
    INTO v_coupon
    FROM public.coupons AS c
    WHERE UPPER(c.code) = UPPER(TRIM(p_coupon_code))
    FOR UPDATE;


    IF NOT FOUND THEN
      RAISE EXCEPTION
        'এই Coupon পাওয়া যায়নি।';
    END IF;


    IF NOT v_coupon.is_active THEN
      RAISE EXCEPTION
        'এই Coupon বর্তমানে active নয়।';
    END IF;


    IF v_coupon.starts_at IS NOT NULL
       AND v_now < v_coupon.starts_at
    THEN
      RAISE EXCEPTION
        'এই Coupon এখনো ব্যবহারযোগ্য নয়।';
    END IF;


    IF v_coupon.expires_at IS NOT NULL
       AND v_now >= v_coupon.expires_at
    THEN
      RAISE EXCEPTION
        'এই Coupon-এর মেয়াদ শেষ হয়ে গেছে।';
    END IF;


    IF v_coupon.usage_limit IS NOT NULL
       AND v_coupon.used_count >= v_coupon.usage_limit
    THEN
      RAISE EXCEPTION
        'এই Coupon-এর usage limit শেষ হয়ে গেছে।';
    END IF;


    IF v_server_subtotal < v_coupon.minimum_order_amount
    THEN
      RAISE EXCEPTION
        'এই Coupon ব্যবহার করতে কমপক্ষে ৳%s টাকার order করতে হবে.',
        v_coupon.minimum_order_amount;
    END IF;


    /* Calculate discount */

    IF v_coupon.discount_type = 'fixed' THEN

      v_coupon_discount :=
        v_coupon.discount_value;

    ELSIF v_coupon.discount_type = 'percentage' THEN

      v_coupon_discount :=
        (
          v_server_subtotal
          * v_coupon.discount_value
        ) / 100;

    ELSE

      RAISE EXCEPTION
        'Invalid coupon discount type';

    END IF;


    /* Maximum discount */

    IF v_coupon.maximum_discount_amount IS NOT NULL
       AND v_coupon_discount >
           v_coupon.maximum_discount_amount
    THEN
      v_coupon_discount :=
        v_coupon.maximum_discount_amount;
    END IF;


    /* Discount cannot exceed subtotal */

    v_coupon_discount :=
      LEAST(
        GREATEST(v_coupon_discount, 0),
        v_server_subtotal
      );


    v_coupon_discount :=
      ROUND(v_coupon_discount, 2);


    /* Consume coupon atomically */

    UPDATE public.coupons AS c
    SET
      used_count = c.used_count + 1,
      updated_at = v_now
    WHERE c.id = v_coupon.id;

  END IF;


  /* =========================================================
     13. Count shops
     ========================================================= */

  SELECT COUNT(*)
  INTO v_shop_count
  FROM (
    SELECT w.shop_id
    FROM pg_temp.order_items_work AS w
    GROUP BY w.shop_id
  ) AS unique_shops;


  /* =========================================================
     14. Create orders
     ========================================================= */

  FOR v_shop IN
    SELECT
      w.shop_id AS current_shop_id,
      ROUND(
        SUM(w.item_subtotal),
        2
      ) AS current_shop_subtotal
    FROM pg_temp.order_items_work AS w
    GROUP BY w.shop_id
    ORDER BY w.shop_id
  LOOP

    v_shop_index :=
      v_shop_index + 1;


    /* Coupon allocation */

    IF v_coupon_discount > 0 THEN

      IF v_shop_index = v_shop_count THEN

        v_shop_discount :=
          ROUND(
            v_coupon_discount
            - v_allocated_discount,
            2
          );

      ELSE

        v_shop_discount :=
          ROUND(
            v_coupon_discount
            * (
              v_shop.current_shop_subtotal
              / v_server_subtotal
            ),
            2
          );

        v_allocated_discount :=
          v_allocated_discount
          + v_shop_discount;

      END IF;

    ELSE

      v_shop_discount := 0;

    END IF;


    /* Shop total */

    v_shop_total :=
      ROUND(
        v_shop.current_shop_subtotal
        + v_delivery_fee
        - v_shop_discount,
        2
      );


    IF v_shop_total < 0 THEN
      v_shop_total := 0;
    END IF;


    /* Unique order number */

    v_order_number :=
      'ORD-'
      || UPPER(
        SUBSTRING(
          REPLACE(
            gen_random_uuid()::text,
            '-',
            ''
          )
          FROM 1 FOR 12
        )
      );


    /* =======================================================
       Create order
       ======================================================= */

    INSERT INTO public.orders (
      order_number,
      customer_id,
      shop_id,
      address_id,
      status,
      payment_method,
      payment_status,
      subtotal,
      delivery_fee,
      discount,
      total_amount,
      customer_note
    )
    VALUES (
      v_order_number,
      v_user_id,
      v_shop.current_shop_id,
      p_address_id,
      'pending',

      /* বর্তমানে শুধুমাত্র COD */
      p_payment_method,

      /* COD হলে unpaid */
      'unpaid',

      v_shop.current_shop_subtotal,
      v_delivery_fee,
      v_shop_discount,
      v_shop_total,

      NULLIF(
        TRIM(
          COALESCE(
            p_customer_note,
            ''
          )
        ),
        ''
      )
    )
    RETURNING id
    INTO v_order_id;


    /* =======================================================
       Create order items
       ======================================================= */

    INSERT INTO public.order_items (
      order_id,
      product_id,
      product_name,
      product_image,
      quantity,
      price,
      subtotal
    )
    SELECT
      v_order_id,
      w.product_id,
      w.product_name,
      w.product_image,
      w.quantity,
      w.unit_price,
      w.item_subtotal
    FROM pg_temp.order_items_work AS w
    WHERE w.shop_id = v_shop.current_shop_id;


    /* =======================================================
       Decrease stock
       ======================================================= */

    UPDATE public.products AS p
    SET
      stock = p.stock - w.quantity,
      updated_at = v_now
    FROM pg_temp.order_items_work AS w
    WHERE p.id = w.product_id
      AND w.shop_id = v_shop.current_shop_id;


    /* =======================================================
       Return order
       ======================================================= */

    RETURN QUERY
    SELECT
      o.id AS order_id,
      o.order_number AS order_number,
      o.shop_id AS shop_id,
      o.subtotal AS subtotal,
      o.delivery_fee AS delivery_fee,
      o.discount AS discount,
      o.total_amount AS total_amount
    FROM public.orders AS o
    WHERE o.id = v_order_id;

  END LOOP;


  /* =========================================================
     15. Remove cart items
     ========================================================= */

  IF NOT p_is_buy_now THEN

    DELETE FROM public.cart_items AS c
    USING pg_temp.requested_order_items AS r
    WHERE c.user_id = v_user_id
      AND c.product_id = r.product_id;

  END IF;


  /* =========================================================
     16. Successful completion
     ========================================================= */

END;
$$;


/* ===========================================================
   Permissions
   =========================================================== */

REVOKE ALL
ON FUNCTION public.create_order_transaction(
  uuid,
  text,
  jsonb,
  text,
  boolean,
  text
)
FROM PUBLIC;


GRANT EXECUTE
ON FUNCTION public.create_order_transaction(
  uuid,
  text,
  jsonb,
  text,
  boolean,
  text
)
TO authenticated;