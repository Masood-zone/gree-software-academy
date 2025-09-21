import Link from "next/link";

export function DesktopNav() {
  return (
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
  );
}
