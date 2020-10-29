# TDD node api server

강의 학습 레포지토리

## 모듈 시스템

Node JS의 모듈 시스템은 ES2015(`import`, `export`)와 사뭇 다르다.
CommonJS 라는 모듈 시스템인데 대략 다음과 같다.

``` javascript
module.export = usefulFunction

...

const usefulFunction = require('./utils.js)
usefulFunction('so nice')
```