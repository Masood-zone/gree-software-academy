"use client";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForgotoPasswordMutation } from "@/lib/services/auth/auth-service";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const { mutateAsync: forgotPassword, isPending: isSubmitting } =
    useForgotoPasswordMutation();
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      await forgotPassword({ email: values.email });
      toast.success("Password reset email sent!");
      setTimer(120); // 2 minutes
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message)
          : "An error occurred. Please try again.";
      setError("root", { type: "server", message: msg });
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to receive a password reset link.
        </p>
      </div>
      <div className="grid gap-6">
        {errors.root?.message && (
          <Alert variant="destructive">
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || timer > 0}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full mt-2"
            disabled={timer > 0}
            onClick={handleSubmit(onSubmit)}
          >
            {timer > 0
              ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60)
                  .toString()
                  .padStart(2, "0")}`
              : "Resend"}
          </Button>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
