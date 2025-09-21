import Link from "next/link";
import Image from "next/image";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F6FA] text-center p-6">
      <Image
        src="/images/logo.png"
        alt="Gree Software Academy"
        width={64}
        height={64}
        className="mb-4 rounded-full"
      />
      <h1 className="text-3xl font-bold mb-2 text-primary">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
        <br />
        Please check the URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
