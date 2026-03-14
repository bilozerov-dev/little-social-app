/* eslint-disable no-unused-vars */
"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Logger from "@/utils/logger";
import { ClientToServerMessage, ClientToServerMessages } from "@/lib/socket/definition/client-to-server";
import useSocketConnection from "./use-socket-connection";
import { NewMessageData } from "@/lib/socket/definition/data";

type RealtimeContextT = {
  sendMessage: (msg: ClientToServerMessages) => void;
  connected: boolean;
};

const RealtimeContext = createContext<RealtimeContextT>({
  sendMessage: () => {},
  connected: false,
});



export default function RealtimeProvider({ children }: PropsWithChildren<{}>) {
  const { connected, socket } = useSocketConnection();
  const sendMessage = useCallback(
    (message: ClientToServerMessage) => {
      if (!connected) {
        Logger.client.warn(
          "Attempted to send socket message before connected.",
          message
        );
        return;
      }

      socket.emit(message.name, ...message.params);
    },
    [connected, socket]
  );

  useEffect(() => {
    const handleNewMessage = (data: NewMessageData) => {}

    socket.on("new message", handleNewMessage )
    
    return () => {
      socket.off("new message", handleNewMessage);
    }
  }, [socket]);

  const ctxValue = useMemo<RealtimeContextT>(() => {
    return { sendMessage, connected, };
  }, [connected, sendMessage]);

  return (
    <RealtimeContext.Provider value={ctxValue}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  return useContext(RealtimeContext);
}
