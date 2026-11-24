// Ridiculous at First Glance, Real by the Second — make.fun entry
// Writes one sentence (172 characters) pitching a bizarre startup idea
// that turns out to be a real business, to /output/entry.txt.
// Deterministic: the same sentence on every run. No input, no network,
// no environment — everything the program needs is in this file.
//
// Why this pitch: hiring ex-burglars to break into your own home sounds
// like a crime until the second half lands — they photograph everything
// they'd steal, and the homeowner pays to fix the weak spots before a
// real thief finds them. The thing sold (a staged break-in audit) and the
// buyer (homeowners) are named in the sentence itself, and the payment
// logic is the punchline: you pay the people who used to exploit the
// weak spots to show you where they are. Verified locally: node main.ts
// exits 0 and /output/entry.txt holds exactly this sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "We hire ex-burglars to break into your home while you're on holiday and photograph everything they'd steal, so you pay to fix the weak spots before a real thief finds them.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH + "\n", "utf8");
