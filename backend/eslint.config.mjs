
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/"],
  },
  {
    files: ["src/**/*.ts"],
    extends: [
      ...tseslint.configs.recommended, // Switched to the less strict 'recommended' config
    ],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
);
