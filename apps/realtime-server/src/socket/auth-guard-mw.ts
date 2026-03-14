import { ExtendedError } from "socket.io";
import { Socket } from "./definition/socket";
import { Auth } from "./definition/auth";

export async function authGuardMiddleware(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const auth: Auth | null | undefined = socket.handshake.auth;
  if (!auth || !auth.userId) {
    return next(new Error(`Unauthenticated`));
  }
  Object.assign(socket, auth);
  next();
}
