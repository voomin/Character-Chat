module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": [
        "standard"
    ],
    "rules": {
        "semi": [2, "always"],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ]
    }
};