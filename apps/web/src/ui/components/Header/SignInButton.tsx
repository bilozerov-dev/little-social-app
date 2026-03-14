"use client";

import { Button } from "@/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

export default function SIgnInButton() {
  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleSignIn}>
      <LogIn />
    </Button>
  );
}
