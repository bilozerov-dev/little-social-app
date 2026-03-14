import { Button } from "@/ui/button";
import classNames from "@/utils/classNames";
import { Plus } from "lucide-react";
import ChatListItem from "./chat-list-item";
import { memo } from "react";
import { ChatOnUserFindManyResult } from "@/types/models/chat";

type Props = {
  chats: ChatOnUserFindManyResult[];
  userId: string;
  className?: string;
  onAddChat: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelectChat: (id: string) => void;
};

export const ChatListSidebar = memo(
  ({ chats, userId, className, onAddChat, onSelectChat }: Props) => {
    return (
      <div
        className={classNames(
          "grow flex gap-3 flex-col h-full max-w-80",
          className,
        )}
      >
        <div className="flex justify-between items-start">
          <h2 className="h2">Chats</h2>

          <Button onClick={onAddChat} className="w-8 h-8" variant="ghost">
            <Plus />
          </Button>
        </div>

        <div
          className={classNames(
            "grow gap-3 divide-y flex flex-col h-full",
            chats.length === 0 && "justify-center items-center",
          )}
        >
          {chats.length === 0 && <div>No chats</div>}
          {chats.length > 0 &&
            chats.map(({ chat }) => {
              return (
                <ChatListItem
                  onClick={() => onSelectChat(chat.id)}
                  key={chat.id}
                  chat={chat}
                  userId={userId}
                />
              );
            })}
        </div>
      </div>
    );
  },
);
ChatListSidebar.displayName = "ChatListSidebar";
