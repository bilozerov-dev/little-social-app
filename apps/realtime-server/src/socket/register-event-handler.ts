import { authorized } from "./authorized";
import { SocketServerT } from "./create-socket-server";
import { Socket } from "./definition/socket";

export function registerEventHandler(server: SocketServerT, socket: Socket) {
  socket.on("new message", (data) => {
    let socketReceiver: Socket[] = [];

    server.of("/").sockets.forEach((s) => {
      if (authorized(s) && data.receieverId.includes(s["userId"])) {
        socketReceiver.push(s);
        s.emit("new message", data);
      }
    });
  });
}
