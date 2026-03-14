"use server";

import UserChatChannelProvider from "@/ui/providers/realtime/UserChatChannelProvider";
import { PropsWithChildren } from "react";
import { getServerSession } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import ChatContainer from "@/ui/containers/chat/chat-container";

export default async function ChatScreen({}: PropsWithChildren<{}>) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return null;
  }

  const { user } = session;
  const { id: userId } = user;

  const chats = await prisma.chatOnUser.findMany({
    where: { userId },
    select: {
      chat: {
        select: {
          id: true,
          name: true,
          users: {
            select: {
              userId: true,
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              text: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });

  return (
    <UserChatChannelProvider userId={userId}>
      <ChatContainer chats={chats} userId={userId} />
    </UserChatChannelProvider>
  );
}
