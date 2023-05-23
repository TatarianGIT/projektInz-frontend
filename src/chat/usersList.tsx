import { useEffect, useState } from "react";

const UsersList = ({ socket, room, email }) => {
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
    <div>
      <p>Użytkownicy:</p>
      <ul>
        {roomUsers.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
