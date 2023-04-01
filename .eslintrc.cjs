module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
    ],
    plugins: ["svelte3", "@typescript-eslint"],
    ignorePatterns: ["*.cjs"],
    overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
    settings: {
        "svelte3/typescript": () => require("typescript"),
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false,
            },
        ],
        "@typescript-eslint/no-throw-literal": "off",
    },
};
