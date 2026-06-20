#!/usr/bin/env node
// Activate the tracked git hooks. Runs automatically on `bun install` / `npm install`
// via the "prepare" script. Fully defensive: if there's no .git (Lovable CI, tarball
// install, CI runner), it silently no-ops so it can never break a build.
import { execSync } from "node:child_process";
import { chmodSync, existsSync } from "node:fs";

try {
  // Only act inside a real git work tree.
  execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
  execSync("git config core.hooksPath scripts/git-hooks", { stdio: "ignore" });
  if (existsSync("scripts/git-hooks/pre-commit")) {
    try { chmodSync("scripts/git-hooks/pre-commit", 0o755); } catch {}
  }
  console.log("[hooks] pre-commit build guard active (core.hooksPath=scripts/git-hooks)");
} catch {
  // No git / no permission — nothing to do.
}
