CREATE TABLE IF NOT EXISTS public.delivery_zone_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  delivery_zone_id uuid NOT NULL
    REFERENCES public.delivery_zones(id)
    ON DELETE CASCADE,

  district text NOT NULL,
  upazila text NOT NULL,

  is_active boolean NOT NULL DEFAULT true,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT delivery_zone_rules_unique_area
    UNIQUE (district, upazila)
);


ALTER TABLE public.delivery_zone_rules
ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Admins can manage delivery zone rules"
ON public.delivery_zone_rules
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
