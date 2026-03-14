"use client";

import { io } from "socket.io-client";
import { Socket } from "./definition/socket";

const URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export const socket: Socket = io(URL, {
  autoConnect: false,
});
