// One Emoji, One Smile — make.fun entry
// Writes exactly one emoji to /output/entry.txt (or $OUTPUT_PATH).
// Node 22 stdlib only. No dependencies, no network, no randomness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Chosen emoji: 🫶 (Heart Hands, U+1FAF6)
// Reason: a human gesture that plainly aims to warm a stranger —
// hands forming a heart is instantly read as kind, friendly
// appreciation, universally, with no words, irony, intimacy or
// flirtation, and it is a deliberate pick, not the default smiley.
const EMOJI = "🫶";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Guardrails for the sealed gate: 1–8 characters, never empty or
// whitespace-only. Count code points, not UTF-16 code units.
const charCount = [...EMOJI].length;
if (charCount < 1 || charCount > 8) {
  throw new Error(`emoji must be 1–8 characters, got ${charCount}`);
}
if (EMOJI.trim().length === 0) {
  throw new Error("emoji must not be whitespace-only");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, EMOJI, "utf8");

// Fail loudly if what landed on disk is not exactly the one emoji.
const written = readFileSync(outputPath, "utf8");
if (written !== EMOJI) {
  throw new Error(`output mismatch: expected exactly the chosen emoji, got ${JSON.stringify(written)}`);
}
