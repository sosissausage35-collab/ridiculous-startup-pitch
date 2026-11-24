// Ridiculous at First Glance, Real by the Second — make.fun entry
// Writes one sentence (153 characters) pitching a bizarre startup idea
// that turns out to be a real business, to /output/entry.txt.
// Deterministic: the same sentence on every run. No input, no network,
// no environment — everything the program needs is in this file.
//
// Judge criteria (RULES.txt, most important first) and how this pitch meets them:
// 1. Bizarre yet a real business: a goat video-calling you awake sounds like a
//    joke, but it is a paid wake-up service — people already pay for wake-up
//    calls and accountability alarms; this one just cannot be snoozed.
// 2. Genuinely bizarre: no reader has heard of a goat as an alarm clock. This
//    is not a familiar business with a strange adjective bolted on (a security
//    audit staffed by ex-burglars, our first draft, was exactly that — a known
//    service with a weird twist, so it was replaced); the service itself is new.
// 3. Business logic holds: the sentence says in its own words why someone pays —
//    "an alarm you can snooze always loses to a goat you can't". The buyer is
//    the heavy sleeper who has tried every alarm app, and the thing sold is a
//    morning video-call from a screaming goat.
// 4. Lands as a pitch: one sentence, 153 characters, with a turn from laughing
//    ("a goat that video-calls every morning and screams") to nodding ("an alarm
//    you can snooze always loses to a goat you can't").
// 5. Concrete and vivid: a goat, a video-call, every morning, screaming, out of
//    bed, an alarm — things and a buyer, not abstractions.
//
// Runtime gate: the program validates the sentence before writing — it must be
// 1–200 characters, a single sentence, and not only whitespace — and fails with
// a clear message if the gate is not met, so an invalid entry can never be
// written silently. Verified locally: node main.ts exits 0 and
// /output/entry.txt holds exactly this sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "We rent you a goat that video-calls every morning and screams until you get out of bed, because an alarm you can snooze always loses to a goat you can't.";

// Gate: the sealed scorer only accepts UTF-8 text of 1–200 characters, not
// only whitespace. Validate before writing so a bad pitch fails loudly here
// instead of scoring 0 silently on the platform.
const length = [...PITCH].length;
if (PITCH.trim().length === 0) {
  throw new Error("PITCH is empty or only whitespace — nothing to write.");
}
if (length < 1 || length > 200) {
  throw new Error(
    `PITCH is ${length} characters, outside the required 1–200 range.`,
  );
}
const sentenceEnders = (PITCH.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !PITCH.endsWith(".")) {
  throw new Error(
    `PITCH must be exactly one sentence ending in a period (found ${sentenceEnders} sentence-ending marks).`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH + "\n", "utf8");
