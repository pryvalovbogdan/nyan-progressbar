/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard", "stylelint-config-css-modules"],
  "plugins": ["stylelint-prettier"],
  "rules": {
    "prettier/prettier": [true, {
        "singleQuote": true,
        "tabWidth": 2,
        "printWidth": 100,
        "useTabs": false,
        "endOfLine": "lf",
    }],
    "import-notation": "string",
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "tailwind",
        "apply",
        "layer",
        "theme",
        "custom-variant",
        "utility",
        "variant",
        "responsive",
        "screen"
      ]
    }],
    "property-no-unknown": [true, {
      "ignoreProperties": ["/^--/"]
    }],
    "lightness-notation": null,
    "hue-degree-notation": null,
    "comment-empty-line-before": null
  }
};
