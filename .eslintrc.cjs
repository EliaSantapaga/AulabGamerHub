module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ["Airbnb", "Airbnb/hooks", "plugin:prettier/recommended"],

  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugin: ["prettier"],

  rules: {
    "react/react-in-jsx-scope": 0,
    "prettier/prettier": "error",
  },
};
