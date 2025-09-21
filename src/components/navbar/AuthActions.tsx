import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthActions() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/auth/login">
        <Button variant="ghost">Login</Button>
      </Link>
      <Link href="/auth/register">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
