"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <Button onClick={() => signIn("openiddict")} className="font-semibold">
      <LogIn className="size-2 mr-2" />
      Login
    </Button>
  );
}
