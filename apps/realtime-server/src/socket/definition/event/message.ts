type MessageEventData = {
  messageId: string;
  chatId: string;
  receieverId: string[];
};

export interface MessageEvents {
  "new message": (data: MessageEventData) => void;
}
