import type { Ceremony } from "./wedding-data";

// All-day style ICS with precise start/end in IST.

function formatICSDate(iso: string, addHours = 6): string {
  const d = new Date(iso);
  d.setHours(d.getHours() + addHours - (addHours ? 0 : 0));
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

export function ceremonyICS(c: Ceremony): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VishalKiVeena//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${c.id}-${c.dateISO}@vishal-veena.vivah`,
    `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
    `DTSTART:${formatICSDate(c.dateISO)}`,
    `DTEND:${formatICSDate(c.dateISO, 6)}`,
    `SUMMARY:${c.title} — Vishal & Veena`,
    `DESCRIPTION:${c.cultural.join(" • ")} Dress code: ${c.dressCode.join(", ")}.`,
    `LOCATION:${c.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS(c: Ceremony) {
  const blob = new Blob([ceremonyICS(c)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vishal-veena-${c.id}-${c.dateLabel.replace(/\s/g, "")}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
