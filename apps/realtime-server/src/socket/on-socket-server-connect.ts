import { SocketServerT } from "./create-socket-server";
import { Socket } from "./definition/socket";
import { registerEventHandler } from "./register-event-handler";

export default function onSocketServerConnect(
  server: SocketServerT,
  socket: Socket
) {
  registerEventHandler(server, socket);
}
