import { useEffect, useState } from "react";
import Chat from "../chat/chat";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import UsersList from "../chat/usersList";
import { TbDoorExit } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import Switch from "../components/switch";
import Logo from "../components/logo";

const socket = io.connect("http://localhost:6060");

const ChatPage = () => {
  const { username, email, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [room, setRoom] = useState<string | null>(null);

  const joinRoom = (room) => {
    socket.emit("joinRoom", { room, username });
  };

  socket.on("setRoom", function (room) {
    setRoom(room);
  });

  const leaveRoom = (room, username) => {
    if (room) {
      socket.emit("leaveRoom", { room, username });
    }
  };

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });

  return (
    <div className="lg:w-screen lg:h-screen h-screen bg-white dark:bg-[#242424]">
      <div className="lg:max-w-screen-2xl mx-auto w-full flex flex-col lg:h-[55rem]">
        <header className="flex justify-between items-center p-2 lg:p-4 border-b border-gray-200 ml-2">
          <Logo />
          <div className="flex items-center gap-2">
            <Switch />
            <div className="bg-gray-200 dark:bg-darkTextSecondaryColor rounded-md overflow-hidden">
              <img
                src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${username}`}
                alt="Avatar"
                className="w-12 h-12"
              />
            </div>

            <div className="flex flex-col text-black">
              <span className="text-xl font-semibold text-gray-900 dark:text-darkTextPrimaryColor leading-tight">
                {username}
              </span>
              <span className="text-sm text-gray-500 leading-tight">
                {email}
              </span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 transition lg:ml-2 ml-0  py-2"
              onClick={() => {
                leaveRoom(room, username);
                logout();
                navigate("/login");
              }}
            >
              <FiLogOut size={20} className="mx-1" />
            </button>
          </div>
        </header>
        <div className="grid lg:grid-cols-4 lg:px-4 gap-4 h-full">
          <div className="lg:flex lg:flex-col gap-2 ">
            <span className="text-base text-gray-700 lg:text-center pt-4 pl-2 lg:pl-0">
              Kanały
            </span>
            <div className="lg:flex lg:flex-col gap-2 grid grid-cols-3">
              {[
                "General",
                "JavaScript",
                "NodeJS",
                "Python",
                "Inne",
                "Pogawędki",
              ]?.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    if (room) {
                      leaveRoom(room, username);
                      setRoom(null);
                    }
                    joinRoom(item);
                    setRoom(item);
                  }}
                  className={`${
                    room === item
                      ? "bg-primary text-white"
                      : "dark:text-darkTextPrimaryColor dark:bg-gray-800  text-black hover:bg-primary hover:text-white dark:hover:text-white"
                  } border-2 transition border-primary rounded-full px-2 py-1.5 text-lg`}
                  disabled={!!room}
                >
                  {item}
                </button>
              ))}
            </div>
            {!!room && (
              <button
                type="button"
                onClick={() => {
                  leaveRoom(room, username);
                  setRoom(null);
                }}
                className={`flex items-center gap-2 text-gray-600 hover:text-red-500 transition mt-4`}
              >
                <div className="shrink-0 grow-0"></div>
                <div className="w-full flex lg:justify-center justify-end gap-1">
                  <TbDoorExit size={22} />
                  <span className="font-bold text-base ">Opuść pokój</span>
                </div>
              </button>
            )}
            <UsersList
              socket={socket}
              room={room}
              email={email}
              username={username}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col p-2 lg:p-4 lg:border-t-0  pt-8 h-full relative overflow-hidden">
            <div className="absolute h-14 -inset-x-24 -top-4 bg-white dark:bg-[#242424] blur-[10px] hidden lg:block"></div>
            {room ? (
              <Chat
                socket={socket}
                room={room}
                email={email}
                username={username}
              />
            ) : (
              <div className="py-16 text-black dark:text-darkTextPrimaryColor flex justify-center items-center text-center ">
                Dołącz do pokoju ale czatować z innymi użytkownikami.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
