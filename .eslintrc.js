// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
  ],
  plugins: [
    "html",
    "no-class",
  ],
  env: {
    "es6": true,
    "browser": true,
    "jasmine": true,
  },
  parser: "babel-eslint",
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  rules: {
    "comma-dangle": [
      2,
      "always-multiline",
    ],
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-debugger": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-var": 2,

    "dot-location": [
      2,
      "property",
    ],
    "eqeqeq": [
      2,
      "smart",
    ],
    "no-else-return": 2,
    "no-eval": 2,
    "no-multi-spaces": 2,
    "no-param-reassign": 2,

    "array-bracket-spacing": [
      2,
      "never",
    ],
    "block-spacing": [
      2,
      "always",
    ],
    "brace-style": 2,
    "comma-spacing": 2,
    "comma-style": [
      2,
      "last",
    ],
    "eol-last": 2,
    "indent": [
      2,
      2,
    ],
    "key-spacing": 2,
    "keyword-spacing": 2,
    "max-len": [
      1,
      {
        "code": 80,
        "ignoreUrls": true,
      },
    ],
    "newline-after-var": 2,
    "newline-before-return": 2,
    "no-multiple-empty-lines": 2,
    "no-trailing-spaces": 2,
    "one-var": [
      2,
      "never",
    ],
    "padded-blocks": [
      2,
      {
        "blocks": "never",
        "switches": "never",
        "classes": "never",
      },
    ],
    "quotes": [
      2,
      "single",
      {
        "allowTemplateLiterals": true,
      }
    ],
    "space-before-blocks": 2,
    "space-before-function-paren": [
      2,
      "never",
    ],
    "space-in-parens": [
      2,
      "never",
    ],
    "space-infix-ops": [
      2,
      {
        "int32Hint": true,
      }
    ],
    "space-unary-ops": 2,

    "arrow-spacing": 2,
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-rest-params": 2,
    "prefer-spread": 2,
    "prefer-template": 2,
    "rest-spread-spacing": [
      2,
      "never",
    ],

    "no-class/no-class": 2,
  },
}
