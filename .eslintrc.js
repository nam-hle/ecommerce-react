module.exports = {
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        project: [
            "./tsconfig.json",
        ]
    },
    extends: ["plugin:prettier/recommended"],
    plugins: ["prettier", "deprecation"],
    settings: {
        react: {
            version: "16.14.0"
        }
    },
    rules: {
        "@typescript-eslint/ban-types": ["error", { types: { object: false } }], // TODO: Enable object for better object typing iterator
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
        curly: "error",
        "no-inner-declarations": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "prettier/prettier": "error",
        "deprecation/deprecation": "warn",
        "mocha/no-exclusive-tests": "error"
    }
};
