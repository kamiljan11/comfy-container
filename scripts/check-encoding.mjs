#!/usr/bin/env node
// Pre-commit build guard.
//
// The classic Lovable failure: an editor/sync converts ASCII string quotes
// into smart quotes (" " ' ') so a delimiter becomes non-ASCII:
//   import x from “react”;   ->  esbuild: Expected string but found "“"
// That ships, Lovable rebuilds on commit, build dies, app goes down.
//
// This guard PARSES each staged JS/TS file with esbuild (the same engine
// vite uses). A smart quote sitting in a delimiter position is a parse error
// and gets blocked. Smart quotes INSIDE strings (legit Polish „cudzysłów")
// parse fine and are left alone — no false positives.
//
// Usage:
//   node scripts/check-encoding.mjs          # scan staged files (pre-commit)
//   node scripts/check-encoding.mjs --all     # scan whole tracked src tree
//
// Wired up by .git/hooks/pre-commit.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { transform } from "esbuild";

const LOADER = { ts: "ts", tsx: "tsx", js: "js", jsx: "jsx", mjs: "js", cjs: "js" };
const all = process.argv.includes("--all");

function listFiles() {
  const cmd = all
    ? 'git ls-files "src/**" scripts/'
    : "git diff --cached --name-only --diff-filter=ACM";
  return execSync(cmd, { encoding: "utf8" }).split("\n").filter(Boolean);
}

let failed = 0;

for (const file of listFiles()) {
  const ext = file.split(".").pop();
  const loader = LOADER[ext];
  if (!loader) continue; // only parse JS/TS — JSON/CSS not the failure mode here
  let code;
  try { code = readFileSync(file, "utf8"); } catch { continue; }

  try {
    await transform(code, { loader, sourcefile: file });
  } catch (err) {
    failed++;
    console.error(`\n✗ ${file} — will break the build:`);
    for (const e of err.errors ?? [{ text: err.message }]) {
      const loc = e.location;
      if (loc) {
        console.error(`    ${file}:${loc.line}:${loc.column + 1}  ${e.text}`);
        console.error(`    > ${loc.lineText}`);
      } else {
        console.error(`    ${e.text}`);
      }
    }
  }
}

if (failed) {
  console.error(`\n${failed} file(s) will fail the Lovable build. Commit blocked.`);
  console.error("Common cause: smart quotes (“ ”) replaced ASCII \" in code.");
  console.error("Fix the delimiter(s) above to straight quotes, then commit again.");
  process.exit(1);
}

console.log("✓ build-parse clean (no smart-quote / syntax breakage in staged code)");
process.exit(0);
