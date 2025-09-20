"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Package, Settings, Menu } from "lucide-react";
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
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Gree Software Academy Logo"
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-foreground">
                Gree Software Academy
              </span>
            </div>
          </Link>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative w-max rounded">
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
                      <div className="flex items-start justify-start gap-2">
                        <div className="flex flex-col items-start space-y-1 leading-none">
                          {session.user.name && (
                            <p className="font-medium">{session.user.name}</p>
                          )}
                          {session.user.email && (
                            <p className="truncate text-sm text-muted-foreground">
                              {session.user.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    {user.role === "ADMIN" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Settings className="mr-2 h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.role === "STUDENT" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard">
                            <Package className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/profile">
                            <Package className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme toggle (desktop only) */}
                <div className="hidden md:block">
                  <ModeToggle />
                </div>
              </>
            ) : (
              <>
                {/* Hide inline auth buttons on mobile; shown on desktop */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/auth/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              </>
            )}

            {/* Mobile theme toggle */}
            <div className="md:hidden">
              <ModeToggle />
            </div>

            {/* Mobile menu (hamburger) */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="rounded"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/courses">Courses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user ? (
                    <>
                      {user.role === "ADMIN" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Settings className="mr-2 h-4 w-4" /> Admin
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {user.role === "STUDENT" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                              <Package className="mr-2 h-4 w-4" /> Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/profile">
                              <Package className="mr-2 h-4 w-4" /> Profile
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/login">Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/register">Get Started</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
