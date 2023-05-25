import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RegisterPage } from "./pages/registerPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/loginPage.tsx";
import ErrorPage from "./pages/errorPage.tsx";
import ChatPage from "./pages/chatPage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { setupAxios } from "./api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: {
      onError(error, variables, context) {
        toast.error(error?.response.data?.message);
      },
    },
  },
});

setupAxios();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
