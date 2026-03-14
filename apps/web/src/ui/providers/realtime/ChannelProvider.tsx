"use client";

import { PropsWithChildren } from "react";

type ChannelProviderProps = {
  id: string;
};

export default function ChannelProvider({
  children,
}: PropsWithChildren<ChannelProviderProps>) {
  return <>{children}</>;
}
