import { z } from "zod";
import { api } from "./api";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterFields = z.infer<typeof registerSchema>;

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
};

export const register = (data: RegisterFields) =>
  api.post<RegisterResponse>("/auth/register", data);
