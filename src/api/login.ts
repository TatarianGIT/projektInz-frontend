import { z } from "zod";
import { api } from "./api";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFields = z.infer<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  email: string;
};

export const login = (data: LoginFields) =>
  api.post<LoginResponse>("/auth/login", data);
