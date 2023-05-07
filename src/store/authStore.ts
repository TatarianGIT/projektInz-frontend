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
  login: (accessToken: string, email: string) => {
    set(() => ({
      accessToken,
      email,
    }));
  },
  logout: () => {
    set({
      accessToken: undefined,
    });
  },
  refreshToken: (accessToken: string) => set(() => ({ accessToken })),
});

export const useAuthStore = create(
  persist(devtools(authStore), { name: "auth" })
);
