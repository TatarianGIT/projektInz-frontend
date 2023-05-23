import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import Button from "../components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  RegisterFields,
  registerSchema,
  register as registerMutation,
} from "../api/register";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });
  const mutation = useMutation(registerMutation, {
    onSuccess: () => {
      navigate("/login");
    },
  });
  const onSubmit = (data: RegisterFields) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap max-w-7xl w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <Logo />
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Stwórz nowe konto!</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <BiUser />
                  </span>
                  <input
                    type="text"
                    id="design-login-username"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Nazwa użytkownika"
                    {...register("username")}
                  />
                </div>
              </div>
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
              <Button label="Zarejestruj się" type="submit" />
            </form>
            <div className="pt-12 pb-12 text-center">
              <p>
                Posiadasz konto?
                <Link to="/login" className="font-semibold underline ml-2">
                  Zaloguj się tutaj!
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <imgAiFillUnlock
            className="hidden object-cover w-full h-screen py-20 md:block"
            src="/Queue-amico.png"
          />
        </div>
      </div>
    </div>
  );
};
