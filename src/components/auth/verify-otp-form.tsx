"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { OtpInput } from "@/components/auth/otp-input";
import { useVerifyOtpMutation } from "@/lib/services/auth/auth-service";
import { toast } from "react-toastify";

export default function VerifyOtpForm() {
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : "";

  const verifyOtpMutation = useVerifyOtpMutation();

  const handleOtpSubmit = async (data: { otp: string }) => {
    verifyOtpMutation.mutate(
      { token: token ?? "", otp: data.otp },
      {
        onSuccess: (result) => {
          if (result.success && result.redirect) {
            toast.success("OTP verified successfully!");
            // Add token to search params for reset-password page
            const url = new URL(result.redirect, window.location.origin);
            url.searchParams.set("token", token ?? "");
            router.push(url.toString());
          }
        },
        onError: () => {
          toast.error("OTP verification failed. Please try again.");
        },
      }
    );
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-bold">Verify OTP</h2>
      <OtpInput
        onSubmit={handleOtpSubmit}
        loading={verifyOtpMutation.isPending}
      />
      <div>
        <p className="text-sm text-muted-foreground">
          Code expired?{" "}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => {
              router.push("/auth/forgot-password");
            }}
          >
            Retry
          </button>
        </p>
      </div>
      {verifyOtpMutation.error && (
        <p className="text-red-600">
          {verifyOtpMutation.error.message || "Verification failed."}
        </p>
      )}
      {verifyOtpMutation.data && !verifyOtpMutation.data.success && (
        <p className="text-red-600">
          {verifyOtpMutation.data.message || "Verification failed."}
        </p>
      )}
    </div>
  );
}
