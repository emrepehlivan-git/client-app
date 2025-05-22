import Link from "next/link";

import { getAuthSession } from "@/lib/authOptions";
import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";

export async function Navbar() {
  const session = await getAuthSession();
  return (
    <nav className="flex items-center justify-between px-4 h-16 border-b">
      <div className="flex items-center gap-2">
        <Link href="/">Home</Link>
      </div>

      <div className="flex items-center gap-2">
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
