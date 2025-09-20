import axios from "axios";

// Create a centralized Axios instance for the app
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor to unwrap data and normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected error";

    return Promise.reject(Object.assign(new Error(message), { status }));
  }
);
