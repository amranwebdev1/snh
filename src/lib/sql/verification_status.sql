CREATE OR REPLACE FUNCTION public.protect_shop_admin_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT public.is_admin() THEN

    IF NEW.verification_status IS DISTINCT FROM OLD.verification_status
       OR NEW.rejection_reason IS DISTINCT FROM OLD.rejection_reason
       OR NEW.verified_at IS DISTINCT FROM OLD.verified_at
       OR NEW.status IS DISTINCT FROM OLD.status
    THEN
      RAISE EXCEPTION
        'এই shop-এর admin-controlled field পরিবর্তন করার অনুমতি নেই।';
    END IF;

  END IF;

  RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS protect_shop_admin_fields
ON public.shops;


CREATE TRIGGER protect_shop_admin_fields
BEFORE UPDATE ON public.shops
FOR EACH ROW
EXECUTE FUNCTION public.protect_shop_admin_fields();