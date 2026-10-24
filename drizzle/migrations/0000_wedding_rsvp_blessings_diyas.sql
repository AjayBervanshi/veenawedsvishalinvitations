CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  headcount integer NOT NULL DEFAULT 1 CHECK (headcount >= 1 AND headcount <= 20),
  side text NOT NULL DEFAULT 'groom' CHECK (side IN ('groom','bride','both')),
  ceremonies text[] NOT NULL DEFAULT '{}',
  dietary_notes text,
  blessing_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.blessings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  message text NOT NULL,
  side text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.diyas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;
GRANT SELECT, INSERT ON public.blessings TO anon, authenticated;
GRANT ALL ON public.blessings TO service_role;
GRANT SELECT, INSERT ON public.diyas TO anon, authenticated;
GRANT ALL ON public.diyas TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blessings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diyas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read RSVPs" ON public.rsvps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can post an RSVP" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read blessings" ON public.blessings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can post a blessing" ON public.blessings FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read diyas" ON public.diyas FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can light a diya" ON public.diyas FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.blessings (guest_name, message, side) VALUES
('Rajmata Shanti Devi (Naniji, Ballia)', 'May Lakshmi and Saraswati walk beside you both, beta. Your Nani has waited many monsoons for this baraat. शुभ विवाह!', 'bride'),
('Mamaji Arun Kumar Singh & Family (Ballia)', 'Veena, from your first steps in our courtyard to this sacred sangam — our blessings follow you always. Welcome Vishal bhai! हम सब का आशीर्वाद आप दोनों के साथ है।', 'bride'),
('Chacha Ramesh Singh & Chachi Sunita (Varanasi)', 'Saat janam ka saath ho. May your home always smell of haldi, marigolds and laughter. जोड़ी सलामत रहे!', 'groom'),
('Dadi Vimla Devi (Maheshwar, MP)', 'From the ghats of Maheshwar to Ballia''s lotus lake, this union was written in the stars. विवाह सुखद हो, बेटा।', 'groom'),
('Tau Deen Dayal & Tauji Family (Ballia)', 'Baraat swagat hai! May your phere circle like the chakor circles the moon — never parting. बहुत बहुत शुभकामनाएँ!', 'groom'),
('Bua Sushma & Phuphaji (Bhopal, MP)', 'Our Bundeli heart is full today. Chanderi ka zari aur Ballia ka paani — what a beautiful jodi! Blessings from all of us.', 'bride'),
('Cousins Rohit, Priya & Aarav (Mumbai)', 'Didi, we promise to dance the loudest at the Sangeet! #VishalKiVeena forever. ढेर सारा प्यार!', 'bride'),
('Mausi Kavita & Mausaji (Lucknow)', 'Mehndi ho achhi gehri, geet ho meethi, aur jeevan ho khushiyon se bhara. आप दोनों को हमारा आशीर्वाद।', 'bride');