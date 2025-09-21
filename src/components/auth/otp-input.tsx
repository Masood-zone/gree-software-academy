"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { OtpStyledInput } from "@/components/extensions/otp-styled-input";

import React from "react";

interface OtpInputProps {
  onSubmit: (data: { otp: string }) => void;
  loading?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ onSubmit, loading }) => {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });

  return (
    <div className="max-w-xs h-fit flex items-center justify-center outline outline-muted rounded-md p-4 bg-background">
      <div className="w-full space-y-2">
        <div className="space-y-1">
          <h2 className="font-semibold">OTP verification</h2>
          <p className="text-xs">
            Enter the 5-digit code sent to your email address or phone number
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormControl>
                  <>
                    <FormItem>
                      <OtpStyledInput
                        numInputs={5}
                        inputType="number"
                        {...field}
                      />
                    </FormItem>
                    <FormMessage />
                  </>
                </FormControl>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
