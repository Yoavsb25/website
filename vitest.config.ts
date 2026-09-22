import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/unit/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      thresholds: {
        lines: 60,
        branches: 50,
        functions: 60,
        statements: 60,
      },
      include: ["src/lib/**", "src/features/**/lib/**", "src/features/**/server/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@content": path.resolve(__dirname, "./content"),
    },
  },
});
