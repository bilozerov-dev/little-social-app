import type { Metadata } from "next";
import { getServerSession } from "@/lib/auth/auth";
import SessionProvider from "@/lib/auth/SessionProvider";
import Header from "@/ui/components/Header/Header";
import RealtimeProvider from "@/ui/providers/realtime/RealtimeProvider";
import { LayoutContextProvider } from "@/ui/providers/layout/layout-context-provider";
import AuthenticationGuard from "@/ui/containers/authentication-guard/AuthenticationGuard";

import "./globals.css";
import { font } from "./fonts/font";
import QueryClientProvider from "@/ui/providers/query-client/query-client-provider";

export const metadata: Metadata = {
  title: "Little social app",
  description: "Fun-first place for you and your friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="uk" className={`${font.className}`}>
      <body id="app">
        <QueryClientProvider>
          <SessionProvider session={session}>
            <RealtimeProvider>
              <div className="flex min-h-screen flex-col gradient-bg">
                <Header />
                <LayoutContextProvider container={{ wrapper: "grow" }}>
                  <AuthenticationGuard>{children}</AuthenticationGuard>
                </LayoutContextProvider>
              </div>
            </RealtimeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
