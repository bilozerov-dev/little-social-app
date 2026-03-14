"use client";

import { Button } from "@/ui/button";
import { useRealtime } from "@/ui/providers/realtime/RealtimeProvider";
import { Cast, CloudOff } from "lucide-react";

export default function RealtimeConnectivityStatus() {
  const { connected } = useRealtime();

  return (
    <Button variant="ghost" size="icon-sm">
      {connected ? <Cast className="" /> : <CloudOff className="text-" />}
    </Button>
  );
}
