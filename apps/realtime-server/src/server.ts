import express from "express";
import { createServer } from "http";
import onSocketServerConnect from "./socket/on-socket-server-connect";
import { welcomeSocketServer } from "./util/welcome";
import { authGuardMiddleware } from "./socket/auth-guard-mw";
import { Socket } from "./socket/definition/socket";
import { createSocketServer } from "./socket/create-socket-server";

export default function server() {
  const PORT = 8000;

  const app = express();
  const httpServer = createServer(app);

  const socketServer = createSocketServer(httpServer);
  socketServer.use(authGuardMiddleware);

  const handleServerConnection = (socket: Socket) => {
    onSocketServerConnect(socketServer, socket);
  };
  socketServer.on("connection", handleServerConnection);

  httpServer.listen(PORT, () => {
    console.log(welcomeSocketServer() + " Port - " + PORT);
  });
}
