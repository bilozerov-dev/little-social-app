import { AdapterUser } from "next-auth/adapters";
import { Session as NextAuthSession } from "next-auth";
export type Session = Omit<NextAuthSession, "user"> & { user?: AdapterUser };
