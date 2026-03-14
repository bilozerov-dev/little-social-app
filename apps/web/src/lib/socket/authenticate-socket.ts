import { Socket } from "./definition/socket";

export function authenticateSocket(socket: Socket, token: string) {
  socket.auth = {
    userId: token,
  };
  return socket;
}
