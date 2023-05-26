import SendMessage from "./sendMessage";
import Messages from "./messages";

export default function Chat({ socket, email, username, room }) {
  return (
    <div className="h-full">
      <Messages socket={socket} email={email} room={room} username={username} />
      <SendMessage
        socket={socket}
        email={email}
        room={room}
        username={username}
      />
    </div>
  );
}
