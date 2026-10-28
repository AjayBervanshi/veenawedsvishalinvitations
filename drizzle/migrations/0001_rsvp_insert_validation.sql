-- Guests submit without signing in; the policy now validates the row
-- contents instead of accepting anything.
DROP POLICY IF EXISTS "Anyone can post an RSVP" ON public.rsvps;
CREATE POLICY "Anyone can post an RSVP"
  ON public.rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    guest_name IS NOT NULL
    AND length(trim(guest_name)) BETWEEN 1 AND 80
    AND headcount BETWEEN 1 AND 20
    AND side IN ('groom', 'bride', 'both')
  );
GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;