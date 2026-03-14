import { Socket as SocketIO } from "socket.io";
import { ClientToServer } from "./event/client-to-server";
import { ServerToClient } from "./event/server-to-client";
import { InterServer } from "./event/inter-server";
import { SocketData } from "./event/socket-data";

export type Socket = SocketIO<
  ClientToServer,
  ServerToClient,
  InterServer,
  SocketData
>;
