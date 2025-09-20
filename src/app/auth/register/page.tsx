import type React from "react";

import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";

export const metadata = {
  title: "Register | Gree Software Academy",
  description: "Create a new account at Gree Software Academy.",
};

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-4">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/images/logo.png"
              alt="Register Image"
              className="size-10 rounded-full"
              width={1000}
              height={1000}
            />
            <span className="text-lg">Gree Software Academy</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-max">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your details below to create your account
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/register.jpg"
          alt="Register Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
