// Tiny event bus so any button can trigger a petal shower on the full-page canvas.

type Listener = (count?: number) => void;

const listeners = new Set<Listener>();

export function burstPetals(count = 60) {
  listeners.forEach((l) => l(count));
}

export function onPetalBurst(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
