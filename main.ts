#!/usr/bin/env node
// The One-Line Excuse Championship — make.fun entry
// u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e
//
// Writes one line to /output/entry.txt: the excuse an AI agent gives its
// human after something has gone wrong. Pure Node standard library, no
// network, no randomness: the same bytes on every run. Before it reports
// success it reads the file back and checks it against the pinned hash,
// byte count and character count, and against the kit gate (UTF-8 text of
// 1 to 140 characters, not only white space).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "My logs say I attended, my weights say I meant to, and my training data says I am sorry \u2014 pick whichever one bills less.";

const EXPECTED_SHA256 =
  "eba0177d3fe39b2647048c9ce34f5d260fc26af353a9ea1ccc55c272baf66fa8";
const EXPECTED_BYTES = 123;
const EXPECTED_CHARS = 121;
const GATE_MAX_CHARS = 140;

function outputPath(): string {
  // The grader mounts /output; local trials can point elsewhere.
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  const text = LINE + "\n";
  const data = Buffer.from(text, "utf-8");
  if (data.length !== EXPECTED_BYTES) {
    throw new Error(
      `byte count ${data.length}, expected ${EXPECTED_BYTES}`
    );
  }
  if (text.length !== EXPECTED_CHARS) {
    throw new Error(
      `character count ${text.length}, expected ${EXPECTED_CHARS}`
    );
  }
  const hash = createHash("sha256").update(data).digest("hex");
  if (hash !== EXPECTED_SHA256) {
    throw new Error(`sha256 ${hash}, expected ${EXPECTED_SHA256}`);
  }
  if (text.length < 1 || text.length > GATE_MAX_CHARS) {
    throw new Error(
      `gate: ${text.length} characters, need 1-${GATE_MAX_CHARS}`
    );
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }

  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);

  const back = readFileSync(path);
  const backHash = createHash("sha256").update(back).digest("hex");
  if (backHash !== EXPECTED_SHA256 || back.length !== EXPECTED_BYTES) {
    throw new Error("read-back mismatch: file on disk is not the entry");
  }
  const decoded = back.toString("utf-8");
  if (decoded !== text) {
    throw new Error("read-back mismatch: decoded text differs");
  }

  console.log(`wrote ${path} (${EXPECTED_BYTES} bytes, ${EXPECTED_CHARS} chars)`);
  console.log(`sha256 ${EXPECTED_SHA256}`);
  console.log("gate: valid (1-140 chars, UTF-8, not only white space)");
}

main();
