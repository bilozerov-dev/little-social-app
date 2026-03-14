import Container from "@/ui/components/Container";
import ChatScreen from "@/ui/screens/chat/chat-screen";

export default function Chats() {
  return (
    <Container as="main" filler="!bg-tranparent">
      <ChatScreen />
    </Container>
  );
}
