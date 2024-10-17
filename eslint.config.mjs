import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      prettier,
      jest,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...jest.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.test.js"],
    rules: {
      "jest/prefer-expect-assertions": "off",
    },
  },
];