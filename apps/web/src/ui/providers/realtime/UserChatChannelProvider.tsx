"use client";

import createChatChannelName from "@/ui/containers/chat/utils/create-chat-channel-name";

import { PropsWithChildren, useMemo } from "react";
import ChannelProvider from "./ChannelProvider";

type ChatContainerProps = {
  userId: string;
};

export default function UserChatChannelProvider({
  userId,
  children,
}: PropsWithChildren<ChatContainerProps>) {
  const channelId = useMemo(() => createChatChannelName(userId), [userId]);

  return <ChannelProvider id={channelId}>{children}</ChannelProvider>;
}
