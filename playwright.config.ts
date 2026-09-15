/// <reference types="node" />
// E2E tests (e2e/*.spec.ts) against a production build of the site.
//
// Why a node-server build: the default build targets Cloudflare Workers
// (nitro output in .output/), and `vite preview` cannot serve it — TanStack's
// preview plugin looks for dist/server/server.js. NITRO_PRESET=node-server
// builds the same app into .output/server/index.mjs, which plain node serves.
// The chat bot only calls its server function when a visitor sends a message,
// so no API keys are needed for these tests.
import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: 0,
  // One browser at a time: the home page renders a Three.js scene, and with
  // parallel workers the home-page tests hit 30 s teardown timeouts (6 of 12 runs
  // locally); on one worker 12 of 12 passed. The suite is small, so this costs little.
  workers: 1,
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx vite build && node .output/server/index.mjs",
    url: baseURL,
    env: { NITRO_PRESET: "node-server", PORT: String(PORT) },
    // the build takes ~40 s locally and longer on a cold CI runner
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
