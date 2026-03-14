import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  AuthOptions,
  getServerSession as nextAuthGetServerSession,
} from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "../prisma/prisma";
import { Session } from "@/types/session";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, user }): Session {
      const s: Session = {
        ...session,
        user,
      };

      return s;
    },
  },
  secret: process.env.AUTH_SECRET,
};

async function getServerSession(): Promise<Session | null> {
  const nextAuthSession: Session | null =
    (await nextAuthGetServerSession(authOptions)) ?? null;

  return nextAuthSession;
}

export { authOptions, getServerSession };
