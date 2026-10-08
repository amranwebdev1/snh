CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  name text NOT NULL,

  description text,

  charge numeric(10, 2) NOT NULL DEFAULT 0
    CHECK (charge >= 0),

  is_active boolean NOT NULL DEFAULT true,

  sort_order integer NOT NULL DEFAULT 0,

  created_at timestamptz NOT NULL DEFAULT now(),

  updated_at timestamptz NOT NULL DEFAULT now()
);


ALTER TABLE public.delivery_zones
ENABLE ROW LEVEL SECURITY;



CREATE POLICY "Admins can manage delivery zones"
ON public.delivery_zones
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());








ALTER TABLE public.delivery_zones
ADD COLUMN IF NOT EXISTS is_fallback boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS delivery_zones_one_fallback_idx
ON public.delivery_zones (is_fallback)
WHERE is_fallback = true;

UPDATE public.delivery_zones
SET
  is_fallback = true,
  updated_at = now()
WHERE name = 'Other District';