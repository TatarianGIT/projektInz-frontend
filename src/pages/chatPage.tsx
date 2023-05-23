import { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Chat from "../chat/chat";
import Logo from "../components/logo";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
// import { useSocketIO } from "../hooks/useSocketIO";
// import { useGetTest } from "../api/test";
import io from "socket.io-client";
import UsersList from "../chat/usersList";

const socket = io.connect("http://localhost:6060");

const ChatPage = () => {
  const { username, email, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const joinRoom = (room) => {
    socket.emit("joinRoom", { room, email });
  };

  socket.on("setRoom", function (room) {
    setRoom(room);
  });

  const leaveRoom = (room, email) => {
    if (room) {
      socket.emit("leaveRoom", { room, email });
    }
  };

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });

  // const xd = useGetTest();

  return (
    <div className="w-full h-screen max-h-screen overflow-scroll ">
      <div className="bg-slate-700 text-cyan-50 grid grid-cols-menu grid-rows-menu h-screen w-screen p-5">
        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Logo />
          </div>
        </div>

        <div className="border-2">
          {room && (
            <div className="flex justify-center items-center h-full">
              <p>Pokój: {room}</p>
              <button
                className="border-2 mx-3"
                onClick={() => {
                  leaveRoom(room, email);
                  // setRoom(null);
                }}
              >
                Opuść pokój
              </button>
              {/* <p>Status: {socketIO.response}</p> */}
              {/* <p>Status: {response}</p> */}
              {/* {xd.isLoading && <span className="animate-spin">Ładowanie</span>}
            {xd.isSuccess && <span>{xd.data.ok}</span>}
            {xd.isError && <span>Błąd!</span>} */}
            </div>
          )}
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Button
              label="Wyloguj się"
              onClick={() => {
                leaveRoom(room, email);
                logout();
                navigate("/login");
              }}
            />
          </div>
        </div>

        <div className="border-2">
          <div className="grid grid-cols-1 gap-3 mt-2 border-b-2 pb-2">
            <p className="flex justify-center border-b-2 pb-2">Menu</p>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, email);
                }
                joinRoom("General");
              }}
            >
              General
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, email);
                }
                joinRoom("JavaScript");
              }}
            >
              JavaScript
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, email);
                }
                joinRoom("NodeJS");
              }}
            >
              NodeJS
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, email);
                }
                joinRoom("Python");
              }}
            >
              Python
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, email);
                }
                joinRoom("Inne");
              }}
            >
              Inne
            </button>
          </div>
          <div className="overflow-x-scroll">
            <p>Email: {email}</p>
            <p>Username: {username}</p>
          </div>
        </div>

        <div className="border-2 max-h-[calc(100vh-8rem)] w-full relative ">
          <Chat socket={socket} email={email} room={room} />
        </div>

        <div className="border-2">
          <div className="h-full w-full">
            <UsersList socket={socket} email={email} room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
