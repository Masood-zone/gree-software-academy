"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/lib/services/auth/auth-service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<{ password: string; confirmPassword: string }>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const passwordValue = watch("password");

  // Get token from URL
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : "";

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token) {
      setError("password", { type: "manual", message: "Missing token." });
      return;
    }
    resetPasswordMutation.mutate(
      { token, newPassword: values.password },
      {
        onSuccess: () => {
          toast.success("Password reset successful! Please check your email.");
          router.push("/auth/login");
        },
        onError: (error) => {
          setError("password", { type: "manual", message: error.message });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className=""
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-base">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="text-base"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (val) =>
                val === passwordValue || "Passwords do not match",
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" disabled={resetPasswordMutation.isPending}>
        {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
      </Button>
      {resetPasswordMutation.error && (
        <p className="text-sm text-destructive">
          {resetPasswordMutation.error.message}
        </p>
      )}
      {resetPasswordMutation.isSuccess && (
        <p className="text-sm text-green-600">
          Password reset successful! Please check your email.
        </p>
      )}
    </form>
  );
}
