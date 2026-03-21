import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Custom rules first to prevent override
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Then include Next.js configs
  ...nextVitals,
  ...nextTs,

  // Global ignore patterns
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
