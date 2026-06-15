import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (e) => {
    const message = e.toString();
    console.log({ e });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`server is running ${message}`);
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
