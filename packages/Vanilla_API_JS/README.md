- [How to import a JSON file in ECMAScript 6?]( https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6)

### basic cli
```bash
pnpm install
pnpm dev
```

###  debug,address already in use :::5000
- dustchendeMacBook-Air:Vanilla_API_JS dustchen$ pnpm dev

> vanilla-nodejs-crud-api@1.0.0 dev /Users/dustchen/workdir/dev_fullstack/packages/Vanilla_API_JS
> nodemon server.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
◇ injected env (1) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
Server error: Error: listen EADDRINUSE: address already in use :::5000
    at Server.setupListenHandle [as _listen2] (node:net:1937:16)
    at listenInCluster (node:net:1994:12)
    at Server.listen (node:net:2099:7)
    at file:///Users/dustchen/workdir/dev_fullstack/packages/Vanilla_API_JS/server.js:50:8 {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 5000
}
[nodemon] clean exit - waiting for changes before restart

```bash
lsof -ti :5000 | xargs kill -9
lsof -i :5000
```