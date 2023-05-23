import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IStore {
  accessToken: string | undefined;
  login: (_accessToken: string) => void;
  logout: () => void;
}

const authStore = (set: any) => ({
  accessToken: undefined,
  email: undefined,
  username: undefined,
  login: (accessToken: string, email: string, username: string) => {
    set(() => ({
      accessToken,
      email,
      username,
    }));
  },
  logout: () => {
    set({
      accessToken: undefined,
      username: undefined,
      email: undefined,
    });
  },
  refreshToken: (accessToken: string) => set(() => ({ accessToken })),
});

export const useAuthStore = create(
  persist(devtools(authStore), { name: "auth" })
);
