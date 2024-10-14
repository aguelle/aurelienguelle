import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser", // Spécifie le parser TypeScript
      parserOptions: {
        tsconfigRootDir: __dirname, // Définit le répertoire racine du tsconfig
        project: "./tsconfig.json", // Chemin vers le fichier tsconfig
        sourceType: "module", // Indique que nous utilisons les modules ES
      },
    },
    plugins: {
      // Ajout du plugin Tailwind CSS
      tailwindcss,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:tailwindcss/recommended", // Ajout des règles Tailwind CSS
    ],
    rules: {
      // Ajoute ici des règles spécifiques si nécessaire
    },
  },
];