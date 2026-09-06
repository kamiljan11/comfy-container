// Standalone from vite.config.ts on purpose: that file is generated/managed by
// @lovable.dev/vite-tanstack-config (see its own header comment warning not to
// hand-edit it), so unit-test config lives here instead of risking a conflict
// with its plugin list.
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
