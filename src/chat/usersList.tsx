import { useEffect, useState } from "react";
import { ImUser } from "react-icons/im";

const UsersList = ({ socket, room, email, username }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    socket.on("chatRoomUsers", (data) => {
      setRoomUsers(data);
    });

    return () => {
      socket.off("chatRoomUsers");
    };
  }, [socket]);

  socket.on("setRoomUsers", function (roomUsersEmpty) {
    setRoomUsers(roomUsersEmpty);
  });

  if (!roomUsers || !roomUsers?.length) return null;

  // console.log(roomUsers);
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <p className="py-4">Użytkownicy online: [{roomUsers?.length}]</p>
      <ul className="w-full flex items-center flex-col gap-2">
        {roomUsers.map((user) => (
          <li
            key={user.id}
            className={`${
              user.username == username
                ? "text-green-400 flex w-full"
                : "text-gray-200 w-full"
            }`}
          >
            {user.username == username ? (
              <div className="flex gap-1 w-full justify-center font-bold">
                <ImUser size={21} />
                {user.username}
              </div>
            ) : (
              <div className="flex w-full justify-center">{user.username}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
