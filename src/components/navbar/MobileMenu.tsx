import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Menu, User2Icon, GraduationCap } from "lucide-react";
import { ModeToggle } from "../theme-toggle";

type UserType = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

export function MobileMenu({
  user,
  handleSignOut,
}: {
  user: UserType | null;
  handleSignOut: () => void;
}) {
  return (
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
                    <Settings className="mr-2 h-4 w-4" /> Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              {user.role === "STUDENT" && (
                <>
                  {/* Dropdown items - User information */}
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  {/* Links */}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <GraduationCap className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User2Icon className="mr-2 h-4 w-4" /> Profile
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
  );
}
