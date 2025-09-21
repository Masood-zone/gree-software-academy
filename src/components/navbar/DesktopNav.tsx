export function DesktopNav() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <div className="hidden md:flex items-center space-x-6">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-2 py-1 text-sm font-medium transition-colors duration-300
              ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }
            `}
          >
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full rounded bg-primary transition-all duration-300
                ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
              `}
              style={{ transformOrigin: "left" }}
            />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
