import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import Button from "../components/button";
import { useForm } from "react-hook-form";
import { LoginFields, login, loginSchema } from "../api/login";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import Switch from "../components/switch";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login: storeLogin } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginFields) => {
    mutation.mutateAsync(data);
  };
  const mutation = useMutation(login, {
    async onSuccess(data, variables, context) {
      storeLogin(data.data.accessToken, data.data.email, data.data.username);
      navigate("/");
    },
  });

  const error = Object.entries(errors).length ? Object.entries(errors) : null;

  return (
    <div className="lg:flex justify-center w-full h-screen bg-white dark:bg-[#242424] ">
      <div className="flex flex-wrap max-w-7xl w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex lg:flex-row flex-col justify-center items-center gap-8 pt-12 lg:justify-start lg:pl-12 lg:-mb-24 mb-4">
            <Logo />
            <Switch />
          </div>

          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center text-black dark:text-gray-100">
              Witaj.
            </p>
            <p className="text-xl text-center  text-black dark:text-gray-100">
              Aby czatować, musisz się zalogować!
            </p>

            <form
              className="flex flex-col justify-center pt-3 md:pt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <AiOutlineMail />
                  </span>
                  <input
                    type="text"
                    id="design-login-email"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4 mb-12">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <AiFillUnlock />
                  </span>
                  <input
                    type="password"
                    id="design-login-password"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Hasło"
                    {...register("password")}
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 text-red-500 p-1 rounded-lg text-center mb-4">
                  {error?.map((item, index) => (
                    <div key={index}>{item[1]?.message}</div>
                  ))}
                </div>
              )}
              <div className="h-full flex items-center justify-center">
                <Button label="Zaloguj się" type="submit" />
              </div>
            </form>
            <div className="pt-12 pb-12 text-center">
              <p className="text-black dark:text-gray-100">
                Nie posiadasz jeszcze konta? <br />
                <Link to="/register" className="font-semibold underline">
                  Zarejestruj się tutaj!
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="hidden object-contain w-full h-screen md:block"
            src="/Messaging-bro.png"
          />
        </div>
      </div>
    </div>
  );
};
