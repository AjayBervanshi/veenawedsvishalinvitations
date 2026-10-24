# Vishal & Veena Living-Scroll Wedding Invitation

## Overview
A single living-scroll page at `/` for the Vishal Singh & Veena Singh wedding (28–30 Nov 2026, Ballia, UP), in the light watercolor stationery style of Wishly's Grand Collection. RSVPs, the blessings wall and the diya counter are stored in a shared Lovable Cloud database so every guest sees one live wall. Illustrations mix hand-coded SVG motifs with a few AI-generated watercolor panels.

## Tech & packages
- TanStack Start (existing template), Tailwind v4 tokens in `src/styles.css`, single route `src/routes/index.tsx` rewritten from the placeholder.
- Install: `framer-motion`, `lucide-react`.
- Fonts via `<link>` in `src/routes/__root.tsx`: Cormorant Garamond (headings), Cinzel Decorative (display monogram/headline), Tiro Devanagari Hindi (Hindi text).
- Canvas/Web Audio/scratch-card/countdown components mount client-side only (after hydration) to keep SSR safe.

## Design system (light mode only)
- Paper: `#FAF6F0`/`#FDFBF7` ivory with subtle grain; cards frosted white 85% + blur(12px).
- Theme accents (watercolor pastels): sky-blue `#E0F2FE`/`#7DD3FC`, lavender `#F3E8FF`/`#C084FC`, haldi yellow `#FEF9C3`/`#FACC15`/`#D97706`, blush/sindoor `#FFE4E6`/`#FDA4AF`/`#BE123C`, temple gold `#C5A059`/`#D4AF37`.
- Text: espresso `#2C221E`, bronze-brown `#5C4938`, antique gold `#9A7B3E`.
- All decorative layers (vines, pavilions, petals, gold thread) in `pointer-events:none` backgrounds at z-0/1; content cards at z-10+; hidden/subtle gutters under 640px. Fluid grid, `max-w-6xl mx-auto`, generous padding, zero overlap at phone/tablet/desktop.

## Data (Lovable Cloud)
Enable Cloud, then one migration with schema + GRANTs + RLS + seed INSERTs (no runtime seeding):
- `rsvps` — guest_name, headcount, side, ceremonies (text[]), dietary_notes, blessing_message, created_at. Anon: SELECT + INSERT.
- `blessings` — guest_name, message, side, created_at. Anon: SELECT + INSERT. Seeded with warm Hindi/English family wishes (MP & Bihar relatives).
- `diyas` — one row per lit diya (guest_name nullable, created_at). Anon: INSERT + SELECT (count via select).
- Guests never sign in; all access is anonymous with these narrow policies.

## Page sections (one route, in order)
1. **Envelope splash** — wax-sealed ivory gatefold with gold `V ♥ V | शुभ विवाह` seal; `?to=GuestName` personalization ("Cordially sealed for …"); tap-to-open cracks the seal, swings paper doors (cubic-bezier(0.77,0,0.175,1)), triggers petal burst and a Web Audio santoor-style chime loop.
2. **Sticky glass header** — V&V monogram, smooth-scroll links, पुष्प वर्षा petal button, music on/off. Watercolor toran SVG at top.
3. **Hero** — gold-line Ganesha vandana shloka, faceless watercolor couple under mandap (AI art), headline + heritage subtitle.
4. **Scratch card + countdown** — canvas gold-foil scratch (touch + mouse, 45% threshold petal burst, tap-to-reveal fallback) revealing "28 · 29 · 30 NOVEMBER 2026"; 4-pill live countdown (Days/Hours/Minutes/Seconds) with ceremony dropdown.
5. **Celebrations grid** — filter tabs (All / per day); 3 arch cards (Haldi yellow, Mehndi lavender-blue, Shadi blush-sindoor) with all verified dates, times, dress codes, cultural notes; per-card animated SVG (urli ripples, dholak music notes, mandap Agni glow); "Add to Calendar (.ics)" per event.
6. **Brother's Promise** — wide stationery card with the Lava Parchhai message (exact quote from brief), Madhubani lotus/peacock/diya frame; "Send a Blessing Diya" button writing to `diyas` with a live counter.
7. **Venue card** — split card: AI watercolor venue sketch + verified Hotel Adarsh Vatika details (address, badges, Gardenia lawns/Gates, 12 AC rooms & pool, phone); buttons: Google Maps route, official venues page, copy address with toast.
8. **RSVP + Blessings Wall + WhatsApp generator** — RSVP form (name, headcount stepper 1–10+, side pills, ceremony checkboxes, dietary/stay notes, blessing message) → inserts into `rsvps` + `blessings`, petal burst on success; CSV export of the guest list; live blessings feed (seeded + live updates via refetch); WhatsApp invite generator with Hindi/Hinglish vs English toggle and `?to=` personalized link builder with one-click copy.

## 5 animation layers
1. Full-page fixed canvas: watercolor petals, mogra, marigold, gold dust drifting, responding to scroll velocity; petal-shower bursts.
2. Hero sandstone pavilions part outward on scroll (translateX) with swaying temple bells.
3. Side-gutter botanical vines / lotus stems / twin peacocks parallax on scroll.
4. Golden Vivah Sutram SVG thread drawing itself with scroll progress (useScroll + stroke-dashoffset), lighting lotus buds at each section.
5. Card micro-animations (drapes, ripples, notes, Agni flicker) + "Lotus Lake" footer with drifting diyas and lotuses.

## Illustrations
- Hand-coded SVG: toran, side vines, pavilions + bells, golden thread, urli, dholak, shadi mandap, diya, lotus buds, Madhubani twin peacocks, Ganesha line motif, paper texture (CSS).
- AI-generated watercolor (3–4 images, palette-matched, no faces): hero mandap couple sketch panel, Hotel Adarsh Vatika venue sketch with lawns, and a wide Blessings/Stationery backdrop. Saved to `src/assets` and imported; hero image's absolute CDN URL used as og:image/twitter:image on the index route.

## SEO & polish
- Real `head()` on the index route: title "Vishal & Veena — Wedding Invitation, 28–30 Nov 2026, Ballia", description, og/twitter tags.
- Mount `<Toaster />` once in `__root.tsx`; toasts for copy actions and RSVP success.
- `?to=` links encode names safely (e.g. `Mamaji+%26+Family`).

## Build order
1. Enable Cloud; migration (tables, GRANTs, RLS, seed blessings).
2. Install framer-motion + lucide-react; fonts in `__root.tsx`; design tokens in `styles.css`; mount Toaster.
3. Generate AI art; build SVG motif library.
4. Build sections top-down (envelope → hero → scratch/countdown → events → brother → venue → RSVP/wall), wiring Cloud reads/writes with React Query.
5. Add the 5 animation layers and responsive/z-index pass.
6. Verify: build logs clean; Playwright pass over open-invite → scratch → RSVP submit → blessing appears → diya counter increments, at mobile (390px) and desktop (1280px) viewports; check no overlaps.

## Out of scope
- No login/auth for guests (anonymous participation only).
- No dark mode (light-only per brief).
