import { Socket } from "./definition/socket";

export function authorized(
  socket: Socket
): socket is Socket & { userId: string } {
  return "userId" in socket && typeof socket.userId === "string";
}
