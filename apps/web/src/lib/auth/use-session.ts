import { Session } from "@/types/session";
import { useSession as useNextAuthSession } from "next-auth/react";

type Authenticated = {
  authenticated: true;
  session: Session;
  loading: false;
};

type Loading = {
  authenticated: false;
  session: null;
  loading: true;
};

type Unauthenticated = {
  authenticated: false;
  session: null;
  loading: false;
};

type UseSessionReturn = Authenticated | Loading | Unauthenticated;

export default function useSession(): UseSessionReturn {
  const nextAuthSession = useNextAuthSession();

  if (nextAuthSession.status === "authenticated") {
    return {
      authenticated: true,
      session: nextAuthSession.data as Session,
      loading: false,
    };
  }

  if (nextAuthSession.status === "loading") {
    return {
      authenticated: false,
      session: null,
      loading: true,
    };
  }

  return {
    authenticated: false,
    session: null,
    loading: false,
  };
}
