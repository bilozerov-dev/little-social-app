"use client";

import { PropsWithChildren } from "react";
import useSession from "@/lib/auth/use-session";
import Container from "@/ui/components/Container";

export default function AuthenticationGuard({
  children,
}: PropsWithChildren<{}>) {
  const session = useSession();

  if (session.authenticated) {
    return children;
  }

  return (
    <Container as="main">
      <div className="flex flex-col grow h-full items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold mb-4">🎉 Welcome to ChillNet! 🌟</h1>
        <p className="text-lg">
          We&apos;re so happy to see you here! 😊 This is a fun-oriented social
          network where you can:
        </p>
        <ul className="list-disc list-inside mt-4 text-left mx-auto max-w-md">
          <li>🎭 Share laughs and memes</li>
          <li>💬 Chat with friends</li>
          <li>🎉 Join the fun and be part of the vibe</li>
          <li>😎 Be chill, spread positivity, and make memories</li>
        </ul>
        <p className="mt-6 text-lg">
          So, what are you waiting for? 🚀 Sign up now and let the fun begin! 🎈
        </p>
      </div>
    </Container>
  );
}
