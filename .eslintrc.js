module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier", "import", "deprecation", "@typescript-eslint", "react-hooks"],
  settings: {
    react: {
      version: "17.0.2",
    },
  },

  rules: {
    "@typescript-eslint/ban-types": ["error", { types: { object: false } }], // TODO: Enable object for better object typing iterator
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
    curly: "error",
    "no-inner-declarations": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "prettier/prettier": "error",
    "deprecation/deprecation": "warn",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index", "internal", "object", "type"],
        "newlines-between": "always-and-inside-groups",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
