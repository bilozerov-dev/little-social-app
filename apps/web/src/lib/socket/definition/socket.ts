import { Socket as SocketIO } from "socket.io-client";
import { ServerToClient } from "./server-to-client";
import { ClientToServer } from "./client-to-server";

export type Socket = SocketIO<ServerToClient, ClientToServer>;
