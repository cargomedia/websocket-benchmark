UNMAINTAINED
============
This project is not maintained anymore.
If you want to take over contact us at tech@cargomedia.ch.

# websocket-benchmark
Run concurrent WebSocket clients and measure the roundtrip-time.

The server is expected to copy every message it receives back to the client!
```
npm install -g websocket-benchmark
```

```
Usage: node websocket-benchmark -h [host] -n [clients] -c [concurrency] -r [roundtrips] -s [size]

Options:
  -h  Host to connect to (e.g. "ws://10.10.10.10/echo/websocket")  [required]
  -n  Number of clients to create                                  [default: 1000]
  -c  Number of concurrent clients                                 [default: 1]
  -r  Number of roundtrips to the server each client should do     [default: 5]
  -s  Size of the message to send                                  [default: 30]
```

## Example
```
websocket-benchmark -h 'ws://echo.websocket.org/' -n 1000 -c 10
```

```
Starting 1000 clients doing 5 roundtrips to `ws://echo.websocket.org/`.
Min: 882ms
Mean: 905ms
Max: 921ms
```
