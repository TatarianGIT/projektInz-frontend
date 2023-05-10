import { api } from "./api";
import { useQuery } from "react-query";

export type getTestResponse = {
  ok: string;
};

export const getTest = () =>
  api.get<getTestResponse>("/auth/test").then(({ data }) => data);

export const useGetTest = () =>
  useQuery({ queryKey: ["info"], queryFn: () => getTest() });
