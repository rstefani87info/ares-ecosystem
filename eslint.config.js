import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["db/**", "docs/**", "public/**"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["datasources/**/*.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
