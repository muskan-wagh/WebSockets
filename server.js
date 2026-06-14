import { WebSocketServer, WebSocket } from "ws";

//acts as the first http request for the connection
// 0: CONNECTING
// 1: OPEN
// 2: CLOSING
// 3: CLOSED
const wss = new WebSocketServer({ port: 8080 });

//connection event
// socket: contain the individual one client
// request: contain the headers like cookies ip address and more
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (e) => {
    const message = e.toString();
    console.log({ e });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`server broadcasr : ${message}`);
      }
    });
  });

  socket.on("error", (err) => {
    console.log(`the error is occured ${err} : ${ip}`);
  });

  socket.on("close", () => {
    console.log("client disconnected");
  });
});

console.log("server is running on the port 8080");
