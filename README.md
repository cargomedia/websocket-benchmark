websocket-benchmark
=========

Run concurrent WebSocket clients and measure the roundtrip-time.

```
npm install
./bin/websocket-benchmark.js -h 'ws://echo.websocket.org/' -n 1000 -c 10
```

Arguments
---------
`-h` Host to connect to (e.g. 'ws://10.10.10.10/echo/websocket').

`-n` Number of clients to create.

`-c` Number of concurrent clients.

`-r` Number of roundtrips to the server each client should do.

`-s` Size of the message to send.
