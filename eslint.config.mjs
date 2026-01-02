import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        ignores: ["dist/**/*"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
    },
    {
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    eslintConfigPrettier,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
        },
    },
]);
