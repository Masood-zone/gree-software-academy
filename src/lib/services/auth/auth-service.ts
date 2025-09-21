import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useRegisterMutation = () =>
  useMutation<RegisterResponse, Error, RegisterInput>({
    mutationKey: ["auth", "register"],
    mutationFn: async (payload) => {
      const response = await api.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      return response.data;
    },
  });

export const useLoginMutation = () =>
  useMutation<LoginResponse, Error, LoginInput>({
    mutationKey: ["auth", "login"],
    mutationFn: async (payload) => {
      const response = await api.post<LoginResponse>("/auth/login", payload);
      return response.data;
    },
  });

export const useForgotoPasswordMutation = () =>
  useMutation<ForgotPasswordResponse, Error, ForgotPasswordInput>({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: async (payload) => {
      const response = await api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        payload
      );
      return response.data;
    },
  });

export const useVerifyOtpMutation = () =>
  useMutation<VerifyOtpResponse, Error, VerifyOtpInput>({
    mutationKey: ["auth", "verify-otp"],
    mutationFn: async (payload) => {
      const response = await api.post<VerifyOtpResponse>(
        "/auth/verify-otp",
        payload
      );
      return response.data;
    },
  });

export const useResetPasswordMutation = () =>
  useMutation<void, Error, { token: string; newPassword: string }>({
    mutationKey: ["auth", "reset-password"],
    mutationFn: async (payload) => {
      await api.post("/auth/reset-password", payload);
    },
  });
