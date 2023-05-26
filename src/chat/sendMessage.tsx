import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";

const SendMessage = ({ socket, email, room, username }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (message !== "") {
      const creationTime = Date.now();
      socket.emit("sendMessage", {
        username,
        room,
        message,
        creationTime,
      });
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="fixed bottom-0 inset-x-0 lg:static flex items-center mt-4 bg-gray-200 rounded-md"
    >
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Napisz swoją wiadomość!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3 pr-32 text-lg"
      />
      <button
        type="submit"
        className="text-primary hover:text-orange-700 transition px-4 py-4 flex items-center justify-center focus:outline-2 focus:outline-primary"
      >
        <IoMdSend size={32} />
      </button>
    </form>
  );
};

export default SendMessage;
