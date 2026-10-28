-- Lock down RSVP table: guests may submit but never read the guest list.
DROP POLICY IF EXISTS "Anyone can read RSVPs" ON public.rsvps;
REVOKE SELECT ON public.rsvps FROM anon;
GRANT ALL ON public.rsvps TO service_role;