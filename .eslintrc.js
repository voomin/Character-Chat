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
        "indent": [ "error", 4, { "SwitchCase": 1 } ],
        "max-len": ["error", {
            "code": 100, // [default-airbnb] 1줄에 100자 이내로 작성
            "ignoreComments": true, // [eslint] 주석은 max-len 적용 안함
            "ignoreTrailingComments": true, // [eslint] 코드 뒤에 붙은 주석도 max-len 적용 안함
            "ignoreUrls": true, // [eslint] url은 max-len 적용 안함
            "ignoreStrings": true, // [eslint] 문자열 max-len 적용 안함
            "ignoreTemplateLiterals": true, // [eslint] `` 을 사용한 문자열 max-len 적용 안함
            "ignoreRegExpLiterals": true // [eslint] 정규식 max-len 적용 안함
        }],
        "camelcase": 0
    }
};