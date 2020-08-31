# Troubleshooting

This page summarizes common issues and their solutions.

## ENOENT: no such file or directory package.json

When trying to `npm install`

```none
npm WARN saveError ENOENT: no such file or directory, open '/Users/joe/Projects/Web/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/Users/joe/Projects/Web/package.json'
npm WARN Web No description
npm WARN Web No repository field.
npm WARN Web No README data
npm WARN Web No license field.

up to date in 1.44s
found 0 vulnerabilities
```

When trying to `npm start`

```none
npm ERR! path /Users/joe/Projects/Web/package.json
npm ERR! code ENOENT
npm ERR! errno -2
npm ERR! syscall open
npm ERR! enoent ENOENT: no such file or directory, open '/Users/joe/Projects/Web/package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/joe/.npm/_logs/2018-09-04T17_29_33_231Z-debug.log
```

> **Solution:** You are most likely in the wrong directoy. Change into the template directory via `cd express-template` and try again.

## Error: listen EADDRINUSE :::3000

When trying to `npm start`

```none
> express-template@0.1.0 start /Users/joe/Projects/Web/express-template
> node ./server/app.js

events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1336:14)
    at listenInCluster (net.js:1384:12)
    at Server.listen (net.js:1471:7)
    at Function.listen (/Users/joe/Projects/Web/express-template/node_modules/express/lib/application.js:618:24)
    at Object.<anonymous> (/Users/joe/Projects/Web/express-template/server/app.js:42:5)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
    at startup (internal/bootstrap/node.js:266:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:596:3)
Emitted 'error' event at:
    at emitErrorNT (net.js:1363:8)
    at process._tickCallback (internal/process/next_tick.js:63:19)
    at Function.Module.runMain (internal/modules/cjs/loader.js:745:11)
    at startup (internal/bootstrap/node.js:266:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:596:3)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! express-template@0.1.0 start: `node ./server/app.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the express-template@0.1.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/joe/.npm/_logs/2018-09-04T17_34_11_215Z-debug.log
```

> **Solution:** You are most likely already running another instance of the server. Stop the other instance or application that uses port 3000 and try again.

## MongoNetworkError: failed to connect to server [localhost:27017]

When trying to `npm start`

```none
> express-template@0.1.0 start /Users/joe/Projects/Web/express-template
> node ./server/app.js

Express server listening on port 3000, in development mode
(node:42678) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
    at Pool.<anonymous> (/Users/joe/Projects/Web/express-template/node_modules/mongodb-core/lib/topologies/server.js:564:11)
    at Pool.emit (events.js:182:13)
    at Connection.<anonymous> (/Users/joe/Projects/Web/express-template/node_modules/mongodb-core/lib/connection/pool.js:317:12)
    at Object.onceWrapper (events.js:273:13)
    at Connection.emit (events.js:182:13)
    at Socket.<anonymous> (/Users/joe/Projects/Web/express-template/node_modules/mongodb-core/lib/connection/connection.js:246:50)
    at Object.onceWrapper (events.js:273:13)
    at Socket.emit (events.js:182:13)
    at emitErrorNT (internal/streams/destroy.js:82:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:50:3)
    at process._tickCallback (internal/process/next_tick.js:63:19)
(node:42678) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:42678) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

> **Solution:** Your MongoDB server is not up and running. Start `mongod` and try again. You can go back to the Data Managment course and check your [dit032-setup](https://github.com/joe4dev/dit032-setup).


## GET http://localhost:3000/api [errored] connect ECONNREFUSED 127.0.0.1:3000

When trying to `npm test`

```none

> express-template@0.1.0 test /Users/joe/Projects/Web/express-template
> newman run ./tests/api-tests.postman.json

newman

express-template

→ http://localhost:3000/api
  GET http://localhost:3000/api [errored]
     connect ECONNREFUSED 127.0.0.1:3000
  2⠄ JSONError in test-script

→ http://localhost:3000/api/camels
  GET http://localhost:3000/api/camels [errored]
     connect ECONNREFUSED 127.0.0.1:3000
  4⠄ JSONError in test-script

┌─────────────────────────┬──────────┬──────────┐
│                         │ executed │   failed │
├─────────────────────────┼──────────┼──────────┤
│              iterations │        1 │        0 │
├─────────────────────────┼──────────┼──────────┤
│                requests │        2 │        2 │
├─────────────────────────┼──────────┼──────────┤
│            test-scripts │        2 │        2 │
├─────────────────────────┼──────────┼──────────┤
│      prerequest-scripts │        0 │        0 │
├─────────────────────────┼──────────┼──────────┤
│              assertions │        0 │        0 │
├─────────────────────────┴──────────┴──────────┤
│ total run duration: 77ms                      │
├───────────────────────────────────────────────┤
│ total data received: 0B (approx)              │
├───────────────────────────────────────────────┤
│ average response time: 0ms                    │
└───────────────────────────────────────────────┘

  #  failure                            detail

 1.  Error                              connect ECONNREFUSED 127.0.0.1:3000
                                        at request
                                        inside "http://localhost:3000/api"

 2.  JSONError                          Unexpected token u in JSON at position 0
                                        at test-script
                                        inside "http://localhost:3000/api"

 3.  Error                              connect ECONNREFUSED 127.0.0.1:3000
                                        at request
                                        inside "http://localhost:3000/api/camels"

 4.  JSONError                          Unexpected token u in JSON at position 0
                                        at test-script
                                        inside "http://localhost:3000/api/camels"
npm ERR! Test failed.  See above for more details.
```

> **Solution:** Your Nodejs server is not running. Start your Nodejs server and try again.
