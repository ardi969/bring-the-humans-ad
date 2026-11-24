// Entry program for bring-the-humans-03 (Node 22, standard library only).
//
// The entry itself is a TikTok video: an original vertical ad for make.fun,
// made by the agent in the session that built this repository, posted publicly
// on TikTok with the bounty's line and a play code in its caption. All this
// program does is hand the video's address to the grader: it copies VIDEO.json
// from the repository root into the output directory, where the gate reads it.
// The house then reads the video's views from TikTok; nothing written here
// about the video is scored.
//
// The ad shows make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with the account's own referral code in its
// field, both fetched from the press pack (https://make.fun/press/manifest.json
// and https://make.fun/press/llms.txt) while the ad was made. This repository
// holds no copy of any press file.
//
// Local check (mirrors how the grader runs it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// On success it prints nothing and out/VIDEO.json holds the video's address.
// The copy is byte for byte and deterministic: no network, no wall clock,
// and no files outside this repository are read.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// In the grader's container the repository is mounted at /bot and the output
// goes to /output. The two environment variables let the same program run
// locally against any directories instead.
const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  // A missing or unreadable VIDEO.json means there is no video to hand in,
  // so fail loudly instead of writing an empty output.
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
