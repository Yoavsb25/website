import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "scripts/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*.{ts,tsx}"],
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "feature", pattern: "src/features/*", capture: ["feature"] },
        { type: "ui", pattern: "src/components/**" },
        { type: "lib", pattern: "src/lib/**" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["feature", "ui", "lib"],
            },
            {
              from: "feature",
              allow: ["ui", "lib"],
            },
            {
              from: "ui",
              allow: ["lib", "ui"],
            },
            {
              from: "lib",
              allow: ["lib"],
            },
          ],
        },
      ],
      "boundaries/no-unknown": "off",
      "boundaries/no-unknown-files": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
