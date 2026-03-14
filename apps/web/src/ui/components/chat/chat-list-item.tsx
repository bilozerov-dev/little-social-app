import { ChatOnUserFindManyResult } from "@/types/models/chat";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../avatar/avatar-with-fallback";
import { Button } from "@/ui/button";

type Props = {
  chat: ChatOnUserFindManyResult["chat"];
  userId?: string;
  onClick: () => void;
};

function InnerComponent({
  image,
  name,
  message,
  onClick,
}: {
  image?: string;
  name: string;
  message: string;
  onClick: () => void;
}) {
  const nameFallback = name.slice(0, 2);

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="justify-start px-0"
      size="free"
    >
      <Avatar>
        {image && (
          <AvatarImage
            src={image}
            alt={nameFallback ?? "Possible user avatar"}
          />
        )}
        {name && <AvatarFallback>{nameFallback}</AvatarFallback>}
      </Avatar>
      <div className="flex flex-col justify-between">
        <div className="text-left text-sm font-medium">{name}</div>
        <div className="text-left muted">{message ?? "No messages"}</div>
      </div>
    </Button>
  );
}

export default function ChatListItem({ onClick, chat, userId }: Props) {
  const { users, messages } = chat;
  const [{ userId: chatUserId1, user }] = users;

  const message = messages.at(-1)?.text ?? "No messages";

  if (chatUserId1 === userId && users.length === 1) {
    // Personal chat
    const { image } = user;

    return (
      <InnerComponent
        name="Personal"
        image={image ?? undefined}
        message={message}
        onClick={onClick}
      />
    );
  }

  const anotherChatParticipant = chat.users.find(
    ({ userId: chatUserId }) => chatUserId !== userId
  );

  if (!anotherChatParticipant) {
    return null;
  }

  const { user: anotherChatUser } = anotherChatParticipant;
  const { image, name } = anotherChatUser;

  return (
    <InnerComponent
      name={name ?? "Unnamed user"}
      image={image ?? undefined}
      message={message}
      onClick={onClick}
    />
  );
}
