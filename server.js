const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Broadcast to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
    console.log("Client disconnected");
  });
});

console.log("Server running on ws://0.0.0.0:3000");
