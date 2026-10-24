// Gentle synthesized santoor-style chime loop via Web Audio API — no audio files.
// Runs entirely client-side, started only from a user gesture (the envelope tap).

type StateListener = (playing: boolean) => void;

const stateListeners = new Set<StateListener>();

let ctx: AudioContext | null = null;
let loopTimer: number | null = null;
let step = 0;
let playing = false;

// Bhairavi-flavored scale (Sa Re Ga Ma Pa Dha Ni), octave-friendly
const SCALE = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
// A calm ascending-descending phrase
const PHRASE = [0, 1, 2, 4, 7, 4, 2, 1, 0, 2, 4, 5, 7, 5, 4, 2];

function notify() {
  stateListeners.forEach((l) => l(playing));
}

function pluck(freq: number, when: number) {
  if (!ctx) return;
  // Two detuned triangles + soft lowpass = santoor-like shimmer
  for (const detune of [0, 6]) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq * Math.pow(2, detune / 1200);
    const gain = ctx.createGain();
    const t = when;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.055, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    osc.connect(gain).connect(filter).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 2.4);
  }
}

function scheduleLoop() {
  if (!ctx) return;
  const noteGap = 0.62;
  const t0 = ctx.currentTime + 0.05;
  for (let i = 0; i < PHRASE.length; i++) {
    pluck(SCALE[PHRASE[i]]!, t0 + i * noteGap);
    // occasional soft octave flourish
    if (i % 4 === 2) pluck(SCALE[PHRASE[i]!]! * 2, t0 + i * noteGap + 0.08);
  }
  step = (step + 1) % 4;
  loopTimer = window.setTimeout(scheduleLoop, PHRASE.length * noteGap * 1000 - 80);
}

export function startMusic() {
  if (playing) return;
  try {
    ctx = ctx ?? new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    playing = true;
    scheduleLoop();
    notify();
  } catch {
    // Web Audio unavailable — stay silent
  }
}

export function stopMusic() {
  playing = false;
  if (loopTimer !== null) {
    window.clearTimeout(loopTimer);
    loopTimer = null;
  }
  notify();
}

export function toggleMusic() {
  if (playing) stopMusic();
  else startMusic();
}

export function isPlaying() {
  return playing;
}

export function onMusicState(listener: StateListener) {
  stateListeners.add(listener);
  return () => {
    stateListeners.delete(listener);
  };
}
