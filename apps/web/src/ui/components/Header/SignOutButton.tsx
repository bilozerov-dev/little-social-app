"use client";

import { Button } from "@/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

export default function SignOutButton() {
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleSignOut}>
      <LogOut />
    </Button>
  );
}
