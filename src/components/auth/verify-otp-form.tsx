"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { OtpInput } from "@/components/auth/otp-input";
import { useVerifyOtpMutation } from "@/lib/services/auth/auth-service";

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
            router.push(result.redirect);
          }
        },
        onError: () => {
          // Error handled by mutation.error
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Verify OTP</h2>
      <OtpInput
        onSubmit={handleOtpSubmit}
        loading={verifyOtpMutation.isPending}
      />
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
