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
