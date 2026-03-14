import { ChatListSidebar } from "@/ui/components/chat/chat-list-sidebar";
import { Fragment, useCallback, useRef, useState } from "react";
import { ChatListContainerProps } from "../types";
import { ChatOnUserFindManyResult } from "@/types/models/chat";
import { UserSearchResult } from "@/types/models/search";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/ui/components/command";
import { Loader } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/components/avatar/avatar-with-fallback";

type Props = ChatListContainerProps & {
  chats: ChatOnUserFindManyResult[];
  // eslint-disable-next-line no-unused-vars
  onSelectChat: (_id: string) => void;
};

export function ChatSidebarContainer({ chats, userId, onSelectChat }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState(chats.length === 0);

  const [users, setUsers] = useState<UserSearchResult[]>([]);

  const searchUserLists = useCallback(async (query: string) => {
    const searchParams = new URLSearchParams({ query });
    const res = await fetch(
      `/api/search/users${
        searchParams.size === 0 ? "" : "?" + searchParams.toString()
      }`,
    );

    if (res.status !== 200) {
      setLoading(false);
      setUsers([]); // Ensure users state is cleared on error
      return;
    }

    const users: UserSearchResult[] = await res.json();

    setUsers([...users]); // Trigger re-render by creating a new array reference
    setLoading(false);
  }, []);

  const debouncedChangeHandlerId = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const handleValueChange = useCallback(
    (v: string) => {
      setValue(v);

      if (debouncedChangeHandlerId.current) {
        clearTimeout(debouncedChangeHandlerId.current);
      }

      if (v.trim().length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      debouncedChangeHandlerId.current = setTimeout(async () => {
        await searchUserLists(v);
      }, 200);
    },
    [searchUserLists],
  );

  const handleCreateChat = useCallback(async (userId: string) => {
    const body = JSON.stringify({ userId });
    await fetch("/api/rest/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    setCommandOpen(false);
  }, []);

  const handleAddChat = useCallback(() => {
    setCommandOpen(true);
  }, []);

  return (
    <Fragment>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput
          value={value}
          onValueChange={handleValueChange}
          placeholder="Type a command or search..."
        />

        <CommandList>
          <div className="p-4 flex gap-3 flex-col justify-center items-center text-center">
            {users.length === 0 && loading && (
              <Loader className="animate-spin" />
            )}
            {users.length === 0 && !loading && "No results((("}

            {users.map(({ id, name, image }) => {
              const nameFallbackString = name?.slice(0, 2);
              return (
                <button
                  className="bg-transparent hover:bg-accent rounded-lg w-full flex justify-start items-center gap-4"
                  onClick={() => handleCreateChat(id)}
                  onKeyDown={(e) =>
                    e.key.toLowerCase() === "enter" && handleCreateChat(id)
                  }
                  key={id}
                >
                  <Avatar>
                    {image && (
                      <AvatarImage
                        src={image}
                        alt={nameFallbackString ?? "Possible user avatar"}
                      />
                    )}
                    {name && (
                      <AvatarFallback>{nameFallbackString}</AvatarFallback>
                    )}
                  </Avatar>

                  {name}
                </button>
              );
            })}
          </div>
        </CommandList>
      </CommandDialog>

      <ChatListSidebar
        className="flex-shrink-0"
        userId={userId}
        chats={chats}
        onAddChat={handleAddChat}
        onSelectChat={onSelectChat}
      />
    </Fragment>
  );
}
