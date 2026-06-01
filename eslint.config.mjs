import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      prettier,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".json"] },
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
    },
    rules: {
      "prettier/prettier": ["error", {
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "all",
        useTabs: false,
        endOfLine: "lf",
        arrowParens: "avoid",
      }],

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      }],

      "prefer-const": "warn",
      "no-param-reassign": "warn",
      "consistent-return": "warn",
      "no-plusplus": "warn",

      "import/extensions": ["error", "ignorePackages", { ts: "never", tsx: "never" }],
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "react-hooks/set-state-in-effect": "off",

      "padding-line-between-statements": ["error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any",    prev: "import", next: "import" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "*", next: "for" },
        { blankLine: "always", prev: "for", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["case", "default"], next: "*" },
      ],
    },
  },
]);
