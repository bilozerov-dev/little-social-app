import { ChatView } from "@/ui/components/chat/chat-view";
import { useChat } from "@/ui/hooks/chat/use-chat";

type Props = {
  className?: string;
  chatId: string;
};

export function ChatViewContainer({ className, chatId }: Props) {
  const { messages } = useChat({ id: chatId });
  return <ChatView messages={messages} className={className} />;
}
