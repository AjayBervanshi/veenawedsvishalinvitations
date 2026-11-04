-- Lock down and validate blessings insertion to prevent unrestricted access
DROP POLICY IF EXISTS "Anyone can post a blessing" ON public.blessings;
CREATE POLICY "Anyone can post a blessing"
  ON public.blessings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    guest_name IS NOT NULL
    AND length(trim(guest_name)) BETWEEN 1 AND 80
    AND message IS NOT NULL
    AND length(trim(message)) BETWEEN 1 AND 500
  );

-- Lock down and validate diya lighting
DROP POLICY IF EXISTS "Anyone can light a diya" ON public.diyas;
CREATE POLICY "Anyone can light a diya"
  ON public.diyas FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    guest_name IS NULL OR length(trim(guest_name)) BETWEEN 1 AND 80
  );

-- Revoke update and delete access from anon users
REVOKE UPDATE, DELETE ON public.blessings FROM anon;
REVOKE UPDATE, DELETE ON public.diyas FROM anon;
GRANT ALL ON public.blessings TO service_role;
GRANT ALL ON public.diyas TO service_role;
