import { RealtimeChannel } from "@/constants/RealtimeChannel";

export default function createChannelName(name: RealtimeChannel, id: string) {
  return `${name}-${id}`;
}
