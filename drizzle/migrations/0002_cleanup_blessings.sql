-- Purge legacy demo blessings so only Singh Family and authentic guest blessings remain.
DELETE FROM public.blessings WHERE guest_name != 'Singh Family';
