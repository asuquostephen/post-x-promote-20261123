// Entry for make.fun's bounty "Promote make.fun's make-your-own-bounty post on X"
// (post-x-promote-make-your-own-bounty-01). Node 22, standard library only.
//
// The entry itself is a post on X: one post of our own that quotes make.fun's
// make-your-own-bounty post, carries a photo of its own, and names @makefunai,
// the sponsor page and our play code in its text. This program's whole job is
// to hand the house that post's address: it reads POST.json at the repository
// root, checks the address really is the address of one X post, and copies the
// file byte for byte to /output/POST.json, where the gate reads it. The house
// reads the post's replies, reposts and quotes itself; nothing written here
// about the post is scored.
//
// Run it the way the grader does (MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Or check the entry without writing anything — it prints the address POST.json
// names once the file passes every check below:
//   MAKEFUN_BOT_DIR=. node main.ts --check

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The address of one post on X: https://x.com/<handle>/status/<id>, the id in
// digits only. The same address on twitter.com, with www. or mobile. before
// the host, is read by the house too, so it passes here as well.
const POST_ADDRESS = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;

function refuse(message: string): never {
  console.error(`post-x-promote: ${message}`);
  process.exit(1);
}

function readPostJson(path: string): string {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return refuse(`POST.json could not be read at ${path}`);
  }
}

function checkedAddress(raw: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return refuse('POST.json is not valid JSON');
  }
  const address = (parsed as { url?: unknown } | null)?.url;
  if (typeof address !== 'string' || !POST_ADDRESS.test(address)) {
    return refuse('POST.json must hold {"url": "https://x.com/<handle>/status/<id>"} naming our own post');
  }
  return address;
}

const raw = readPostJson(join(botDir, 'POST.json'));
const address = checkedAddress(raw);

if (process.argv.includes('--check')) {
  console.log(`POST.json names ${address}`);
} else {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'POST.json'), raw);
}
