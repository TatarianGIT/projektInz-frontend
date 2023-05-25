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
    // <div className="relative flex">
    <form className="relative flex" onSubmit={sendMessage}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Napisz swoją wiadomość!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3 pr-32"
      />
      <div className="absolute rounded-r-full bg-gray-200 right-0 items-center inset-y-0 hidden sm:flex">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-r-md  px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <span className="font-bold">Wyślij</span>
          <IoMdSend />
        </button>
      </div>
    </form>
    // </div>
  );
};

export default SendMessage;
