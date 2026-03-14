import { PaginatedChatMessageGetPayload } from "@/types/models/message";
import { Message } from "@/ui/types/Message";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type Props = {
  id: string;
};

type UseChatReturnT = {
  messages: Message[];
};

type ChatApiData = {
  nextCursor: string | null;
  messages: PaginatedChatMessageGetPayload;
};

const getChat = async (
  id: string,
  cursor: string | null
): Promise<ChatApiData> => {
  const url = `/api/message?chatId=${id}&limit=20${
    cursor ? `&cursor=${cursor}` : ""
  }`;
  const response = await fetch(url);
  return response.json();
};

export function useChat({ id }: Props): UseChatReturnT {
  const { data } = useInfiniteQuery<ChatApiData, Error>({
    queryKey: ["chat", id],
    queryFn: async ({ pageParam }) => getChat(id, pageParam as string | null),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: null,
  });

  const messages = useMemo<Message[]>(() => {
    if (!data) {
      return [];
    }

    return data.pages.reduce<Message[]>((result, pageData) => {
      return [
        ...result,
        ...pageData.messages.map<Message>((message) => ({
          userId: message.userId,
          content: message.text,
        })),
      ];
    }, []);
  }, [data]);

  return {
    messages,
  };
}
