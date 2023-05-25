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

  // const xd = useGetTest();

  return (
    <div className="w-full h-screen overflow-scroll flex justify-center">
      <div className="bg-slate-700 text-cyan-50 grid grid-cols-menu grid-rows-menu max-h-screen h-full w-full max-w-[1400px] min-w-[800px] p-5">
        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Logo />
          </div>
        </div>

        <div className="border-2">
          {room && (
            <div className="flex justify-center items-center h-full">
              <p>Pokój: {room}</p>
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
                leaveRoom(room, username);
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
                  leaveRoom(room, username);
                  setRoom(null);
                }
                joinRoom("General");
                setRoom("General");
              }}
            >
              General
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, username);
                  setRoom(null);
                }
                joinRoom("JavaScript");
                setRoom("JavaScript");
              }}
            >
              JavaScript
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, username);
                  setRoom(null);
                }
                joinRoom("NodeJS");
                setRoom("NodeJS");
              }}
            >
              NodeJS
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, username);
                  setRoom(null);
                }
                joinRoom("Python");
                setRoom("Python");
              }}
            >
              Python
            </button>
            <button
              onClick={() => {
                if (room) {
                  leaveRoom(room, username);
                  setRoom(null);
                }
                joinRoom("Inne");
                setRoom("Inne");
              }}
            >
              Inne
            </button>
          </div>
          <div className="pt-2">
            {room && (
              <div className="border-b-2 pb-2 h-full w-full flex justify-center">
                <button
                  className="border-2 m-1 py-1 w-[65%]"
                  onClick={() => {
                    leaveRoom(room, username);
                    setRoom(null);
                  }}
                >
                  Opuść kanał
                </button>
              </div>
            )}
            <div className="grid grid-rows-2 gap-2 p-4 ">
              <p>Email: {email}</p>
              <p>Username: {username}</p>
            </div>
          </div>
        </div>

        {room ? (
          <div className="border-2 max-h-[calc(100vh-7.8rem)] w-full relative ">
            <Chat
              socket={socket}
              room={room}
              email={email}
              username={username}
            />
          </div>
        ) : (
          <div className="border-2 w-full h-full flex items-center justify-center">
            <p>Dołącz do pokoju ale czatować z innymi użytkownikami.</p>
          </div>
        )}

        {/* <div className="border-2 max-h-[calc(100vh-7.8rem)] w-full relative ">
          <Chat socket={socket} room={room} email={email} username={username} />
        </div> */}

        <div className="border-2">
          <div className="h-full w-full">
            <UsersList
              socket={socket}
              room={room}
              email={email}
              username={username}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
