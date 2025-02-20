import Link from "next/link";
import { LoginButton } from "@/components/login-button";
import { LogoutButton } from "@/components/logout-button";
import { isAuthenticated } from "@/lib/authUtils";

export async function Navbar() {
  const isAuth = await isAuthenticated();

  return (
    <nav className="flex items-center justify-between px-4 h-16 border-b">
      <div className="flex items-center gap-2">
        <Link href="/">Home</Link>
      </div>

      <div className="flex items-center gap-2">
        {isAuth ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
