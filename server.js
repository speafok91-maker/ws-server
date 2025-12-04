import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT || 5000 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        console.log("Message:", msg.toString());

        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
