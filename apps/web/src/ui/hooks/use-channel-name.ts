import { RealtimeChannel } from "@/constants/RealtimeChannel";
import { useMemo } from "react";
import createChannelName from "../utils/create-channel-name";

export default function useChannelName(name: RealtimeChannel, id: string) {
  return useMemo(() => createChannelName(name, id), [name, id]);
}
