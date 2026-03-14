import { getServerSession } from "@/lib/auth/auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import ChatsButton from "./ChatsButton";
import Link from "next/link";
import RealtimeConnectivityStatus from "./RealtimeConnectivityStatus";

export default async function Header() {
  const session = await getServerSession();

  return (
    <div
      className="px-4 justify-end items-center h-8 flex gap-4 bg-background/90 rounded-b-xl"
      style={{
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      {session?.user ? (
        <div className="flex gap-2 items-center">
          <Link href="/" className="no-underline text-foreground">
            {session?.user?.name}
          </Link>
          <RealtimeConnectivityStatus />
          <ChatsButton />
          <SignOutButton />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="muted">Unauthenticated</div>
          <RealtimeConnectivityStatus />
          <SignInButton />
        </div>
      )}
    </div>
  );
}
