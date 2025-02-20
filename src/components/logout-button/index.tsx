"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/authUtils";

export function LogoutButton() {
  return (
    <Button onClick={signOut}>
      <LogOut className="size-1 mr-1" />
      Logout
    </Button>
  );
}
