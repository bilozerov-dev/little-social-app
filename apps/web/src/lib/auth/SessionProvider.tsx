"use client";

import { Session } from "@/types/session";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function SessionProvider({
  children,
  session,
}: PropsWithChildren<{
  session: Session | null;
}>) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
