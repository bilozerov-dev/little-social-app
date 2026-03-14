import useSession from "@/lib/auth/use-session";
import { authenticateSocket } from "@/lib/socket/authenticate-socket";
import { socket } from "@/lib/socket/client";
import Logger from "@/utils/logger";
import { useEffect, useState } from "react";

export default function useSocketConnection() {
  const [connected, setIsConnected] = useState<boolean>(socket.connected);

  const [connLoading, setConnLoading] = useState(false);
  const [disconnLoading, setDisconnLoading] = useState(false);

  const { authenticated, session } = useSession();

  useEffect(() => {
    function onConnect() {
      Logger.client.info("Socket connect");
      setConnLoading(false);
      setIsConnected(true);
    }

    function onDisconnect() {
      Logger.client.info("Socket disconnect");
      setDisconnLoading(false);
      setIsConnected(false);
    }

    function onAny(...args: any) {
      Logger.client.log("Socket ANY: ", ...args);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.onAny(onAny);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.offAny(onAny);
    };
  }, []);

  useEffect(() => {
    if (!authenticated && connected && !disconnLoading) {
      setDisconnLoading(true);
      socket.disconnect();
    }
  }, [authenticated, connected, disconnLoading]);

  useEffect(() => {
    if (authenticated && session.user && !connected && !connLoading) {
      setConnLoading(true);
      authenticateSocket(socket, session.user.id).connect();
    }
  }, [authenticated, connLoading, connected, session]);

    return {
      connected,
      socket,
    };
}