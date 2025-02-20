"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleSigninCallback } from "@/lib/authUtils";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function processCallback() {
      await handleSigninCallback();
      router.push("/");
    }
    processCallback();
  }, [router]);

  return <div>Kimlik doğrulama yapılıyor...</div>;
}
