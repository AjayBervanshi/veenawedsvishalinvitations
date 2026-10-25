import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PetalCanvas, VivahSutram, SideGutters } from "@/components/wedding/animations";
import { EnvelopeSplashScreen } from "@/components/wedding/EnvelopeSplashScreen";
import { Header } from "@/components/wedding/Header";
import { Hero } from "@/components/wedding/Hero";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { EventsSection } from "@/components/wedding/EventsSection";
import { BrothersNoteSection } from "@/components/wedding/BrothersNoteSection";
import { VenueSection } from "@/components/wedding/VenueSection";
import { RsvpAndBlessingsSection } from "@/components/wedding/RsvpAndBlessingsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden paper-grain">
      {!envelopeOpen && <EnvelopeSplashScreen onOpen={() => setEnvelopeOpen(true)} />}

      <PetalCanvas />
      <VivahSutram />
      <SideGutters />

      <Header />

      <main className="relative z-10">
        <Hero />
        <CountdownSection />
        <EventsSection />
        <BrothersNoteSection />
        <VenueSection />
        <RsvpAndBlessingsSection />
      </main>
    </div>
  );
}
