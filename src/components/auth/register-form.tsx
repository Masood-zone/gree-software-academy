"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRegisterMutation } from "@/lib/services/auth/auth-service";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { DatePicker } from "@/components/date-picker";

type FormValues = {
  fullName: string;
  email: string;
  phone?: string;
  birthday?: Date | string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      birthday: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        birthday: values.birthday
          ? values.birthday instanceof Date
            ? values.birthday.toISOString()
            : new Date(values.birthday).toISOString()
          : null,
        password: values.password,
      };

      await registerMutation.mutateAsync(payload);
      toast.success("Registration successful. Please sign in.");
      router.push("/auth/login");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message)
          : "Registration failed";
      setError("root", { type: "server", message: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          className=""
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className=""
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="">
          Phone Number (Optional)
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          className=""
          {...register("phone")}
        />
      </div>

      <div className="space-y-2">
        <Controller
          control={control}
          name="birthday"
          render={({ field: { value, onChange } }) => (
            <DatePicker
              id="birthday"
              label="Birthday (Optional)"
              value={
                value instanceof Date
                  ? value
                  : value
                  ? new Date(value)
                  : undefined
              }
              onChange={(d) => onChange(d)}
            />
          )}
        />
      </div>

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

      <Button
        type="submit"
        className="w-full text-base"
        size="lg"
        disabled={isSubmitting || registerMutation.isPending}
      >
        {(isSubmitting || registerMutation.isPending) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Create Account
      </Button>

      <div className="mt-1">
        <p className="text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
