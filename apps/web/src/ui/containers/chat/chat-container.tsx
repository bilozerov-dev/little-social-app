"use client";

import { ChatListContainerProps } from "./types";
import { ChatOnUserFindManyResult } from "@/types/models/chat";
import { ChatSidebarContainer } from "./sidebar/chat-sidebar-container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ChatViewContainer } from "./chat-view/chat-view-container";
import { Chat } from "@prisma/client";

export default function ChatListContainerChildren({
  userId,
  chats,
}: ChatListContainerProps & { chats: ChatOnUserFindManyResult[], chat?: Chat }) {
  const searchParams = useSearchParams();

  const chatId = searchParams.get("chatId");

  const router = useRouter();
  const pathname = usePathname();

  const handleSelectChat = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("chatId", id);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="flex gap-4 h-full grow">
      <ChatSidebarContainer
        onSelectChat={handleSelectChat}
        userId={userId}
        chats={chats}
      />

      {!chatId && (
        <div className="muted border rounded-xl flex-grow flex justify-center items-center">
          Select chat
        </div>
      )}
      {chatId && <ChatViewContainer chatId={chatId} className="flex-grow" />}
    </div>
  );
}
