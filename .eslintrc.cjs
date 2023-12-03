module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-refresh"],
  "env": {
    "node": true
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
