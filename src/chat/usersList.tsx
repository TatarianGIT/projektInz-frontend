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

  return (
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
      <span className="text-base text-gray-700">
        Użytkownicy online {`[${roomUsers?.length ?? 0}]`}
      </span>
      <div className="flex flex-col gap-2">
        {roomUsers?.map((item, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div className="bg-gray-200 rounded-md relative">
              <img
                src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${item?.username}`}
                alt="Avatar"
                className="w-10 h-10"
              />
              <div className="bg-green-500 w-3 h-3 rounded-full absolute -right-1 -bottom-1"></div>
            </div>
            <span className="text-lg font-semibold text-gray-900 leading-tight">
              {item?.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
