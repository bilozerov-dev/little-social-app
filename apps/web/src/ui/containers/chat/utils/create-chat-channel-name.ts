import { RealtimeChannel } from "@/constants/RealtimeChannel";
import createChannelName from "@/ui/utils/create-channel-name";

export default function createChatChannelName(id: string) {
  return createChannelName(RealtimeChannel.Chat, id);
}
