import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { api } from "./api";

export const setupAxios = () => {
  api.interceptors.request.use(
    async (config) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken)
        // @ts-ignore
        config.headers!.Authorization = `Bearer ${accessToken}`;

      if (!config.url) console.error("req.url is not defined");

      return config;
    },
    (err) => Promise.reject(err)
  ),
    axios.interceptors.response.use(
      (response) => response,
      (err) => {
        const { response, config } = err;

        const { accessToken } = useAuthStore.getState();

        if (response.status === 401) {
          if (!accessToken) {
            useAuthStore.setState({ accessToken: undefined });
            return Promise.reject(err);
          }
          return Promise.reject(err);
        }
      }
    );
};
