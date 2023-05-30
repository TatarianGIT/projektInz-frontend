import { useState } from "react";
import { IoMdSend } from "react-icons/io";

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
      className="fixed bottom-0 inset-x-0 lg:static flex items-center bg-gray-200 dark:bg-darkTextSecondaryColor rounded-md"
    >
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Napisz swoją wiadomość!"
        className="w-full focus:outline-none  dark:text-white dark:placeholder-gray-500 dark:bg-darkTextSecondaryColor  focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3 lg:pr-32 pr-5 text-lg"
      />
      <button
        type="submit"
        className="text-primary hover:text-orange-700 transition px-4 py-4 flex items-center justify-center focus:outline-2 focus:outline-primary border-l-2 border-gray-300 dark:border-gray-500"
      >
        <IoMdSend size={32} />
      </button>
    </form>
  );
};

export default SendMessage;
