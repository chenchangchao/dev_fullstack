# nest cli
```sh
npm i -g @nestjs/cli # install nestjs globally
nest new lesson1/
cd lesson1 
nest g module users
nest g controller users
nest g service users # provider
```
# bug fixed
* [can't run nestjs project if it's using esm](https://stackoverflow.com/questions/70545129/compile-a-package-that-depends-on-esm-only-library-into-a-commonjs-package)
```js
./package.json
"type": "commonjs",

./tsconfig.json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "lib": [
      "ESNext"
    ],
    "module": "CommonJS",
    "moduleResolution": "Node",
    "noUncheckedIndexedAccess": true,
    "outDir": "dist",
    "strict": true,
    "target": "ESNext",
  },
  "include": [
    "./src/**/*"
  ]
}
```
* [Create a Hybrid NPM Module for ESM and CommonJS.](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)
* import chalk  from 'chalk';执行导入报错
```js
const chalk_1 = require("chalk");
                ^
Error [ERR_REQUIRE_ESM]: require() of ES Module D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\node_modules\.pnpm\chalk@5.3.0\node_modules\chalk\source\index.js from D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\dist\main.js 
not supported.
Instead change the require of index.js in D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\dist\main.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\dist\main.js:6:17)
```
* 公网IP地址显示报错，console.log(`Server is running on http://${ip}:${port}.`);
```js
[Nest] 27164  - 2024/03/25 17:49:51   ERROR [NestApplication] Error: listen EACCES: permission denied 10.254.185.207 +4Error: listen EACCES: permission denied 10.254.185.207
    at Server.setupListenHandle [as _listen2] (node:net:1855:21)
    at listenInCluster (node:net:1920:12)
    at Server.listen (node:net:2025:5)
    at ExpressAdapter.listen (D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\node_modules\.pnpm\@nestjs+platform-express@10.3.5_@nestjs+common@10.3.5_@nestjs+core@10.3.5\node_modules\@nestjs\platform-express\adapters\express-adapter.js:95:32)
    at D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\node_modules\.pnpm\@nestjs+core@10.3.5_@nestjs+common@10.3.5_@nestjs+platform-express@10.3.5_reflect-metadata@0.1.14_rxjs@7.8.1\node_modules\@nestjs\core\nest-application.js:180:30
    at new Promise (<anonymous>)
    at NestApplication.listen (D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\node_modules\.pnpm\@nestjs+core@10.3.5_@nestjs+common@10.3.5_@nestjs+platform-express@10.3.5_reflect-metadata@0.1.14_rxjs@7.8.1\node_modules\@nestjs\core\nest-application.js:170:16)
    at bootstrap (D:\workdir\nodedev\github\dev_nestjs\lesson1\backend\src\main.ts:15:3)
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
