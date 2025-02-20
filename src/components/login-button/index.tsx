"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/authUtils";

export function LoginButton() {
  return (
    <Button className="font-semibold" onClick={signIn}>
      <LogIn className="size-1 mr-1" />
      Login
    </Button>
  );
}
