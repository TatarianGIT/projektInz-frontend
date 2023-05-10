import { useEffect } from "react";
import Button from "../components/button";
import Chat from "../components/chat";
import Logo from "../components/logo";
import { useAuthStore } from "../store/authStore";
import io from "socket.io-client";
import { useGetTest } from "../api/test";
import { useNavigate } from "react-router-dom";

const uri_ws = "http://localhost:6060";
const socket = io(uri_ws);

const ChatPage = () => {
  const { email, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected!");
  //   });

  //   return () => {
  //     socket.off("connect");
  //   };
  // }, []);

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });

  const xd = useGetTest();

  return (
    <div className="w-full h-full">
      <div className="bg-slate-700 text-cyan-50 grid grid-cols-menu grid-rows-menu h-screen w-screen p-5">
        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Logo />
            {email}
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Pokój</p>
            {xd.isLoading && <span className="animate-spin">Ładowanie</span>}
            {xd.isSuccess && <span>{xd.data.ok}</span>}
            {xd.isError && <span>Błąd!</span>}
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Button
              label="Wyloguj się"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            />
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Menu</p>
          </div>
        </div>

        <div className="border-2 flex flex-col h-full">
          <Chat />
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Użytkownicy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
