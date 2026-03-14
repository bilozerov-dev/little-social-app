import { IncomingMessage, Server as ServerHttp, ServerResponse } from "http";
import { Server as ServerSocketIO } from "socket.io";
import { ClientToServer } from "./definition/event/client-to-server";
import { ServerToClient } from "./definition/event/server-to-client";
import { InterServer } from "./definition/event/inter-server";
import { SocketData } from "./definition/event/socket-data";

export type SocketServerT = ServerSocketIO<
  ClientToServer,
  ServerToClient,
  InterServer,
  SocketData
>;

export function createSocketServer(
  httpServer: ServerHttp<typeof IncomingMessage, typeof ServerResponse>
): SocketServerT {
  const DEV = process.env.NODE_ENV === "development";
  const CORS = DEV
    ? {
        origin: /^http:\/\/localhost:300\d{1}$/,
        methods: ["GET", "POST"],
      }
    : undefined;

  const serverOptions = {
    cors: CORS,
  };

  return new ServerSocketIO<
    ClientToServer,
    ServerToClient,
    InterServer,
    SocketData
  >(httpServer, serverOptions);
}
