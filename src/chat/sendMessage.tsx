import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";

const SendMessage = ({ socket, email, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const creationTime = Date.now();
      socket.emit("sendMessage", {
        email,
        room,
        message,
        creationTime,
      });
      setMessage("");
    }
  };

  return (
    <div className="relative flex">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Napisz swoją wiadomość!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
      />
      <div className="absolute rounded-r-full bg-gray-200 right-0 items-center inset-y-0 hidden sm:flex">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <GrEmoji />
        </button>
        <button
          onClick={sendMessage}
          type="button"
          className="inline-flex items-center justify-center rounded-r-md  px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <span className="font-bold">Wyślij</span>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
