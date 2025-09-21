import Link from "next/link";
import Image from "next/image";

export function Brand() {
  return (
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
  );
}
