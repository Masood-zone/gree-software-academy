"use client";
import { signOut, useSession } from "next-auth/react";
import { Brand } from "../navbar/Brand";
import { DesktopNav } from "../navbar/DesktopNav";
import { AuthActions } from "../navbar/AuthActions";
import { MobileMenu } from "../navbar/MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../theme-toggle";

export function Navigation() {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Brand />
          <DesktopNav />
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Avatar dropdown for authenticated users */}
                <div className="hidden md:block">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) ||
                        session.user.email?.charAt(0) ||
                        "USR"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {/* User Information */}
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
                {/* Theme toggle (desktop only) */}
                <div className="hidden md:block">
                  <ModeToggle />
                </div>
              </>
            ) : (
              <AuthActions />
            )}
            {/* Mobile theme toggle */}
            <div className="md:hidden">
              <ModeToggle />
            </div>
            {/* Mobile menu (hamburger) */}
            {user && (
              <MobileMenu
                user={{
                  ...user,
                  name: user.name ?? undefined,
                  email: user.email ?? undefined,
                  image: user.image ?? undefined,
                }}
                handleSignOut={handleSignOut}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
