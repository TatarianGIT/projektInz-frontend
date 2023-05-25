import { useEffect, useRef, useState } from "react";

const Messages = ({ socket, email, room, username }) => {
  const [messagesReceived, setMessagesReceived] = useState<
    {
      message: string;
      email?: string;
      creationTime: string;
      username: string;
    }[]
  >([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", ({ ...data }) => {
      // console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          creationTime: data.creationTime,
        },
      ]);
    });

    socket.on("setMessages", function (messages) {
      setMessagesReceived(messages);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesReceived]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { timeZone: "UTC" });
  }

  return (
    <div className="w-full max-h-full pt-2 pb-[5.2rem]">
      {messagesReceived.map((msg, i) => (
        <div
          key={i}
          className={`
          ${
            !msg.username
              ? "text-gray-500 w-full flex items-center justify-center p-4"
              : msg.username && username == msg.username
              ? "ml-auto bg-cyan-900 border-2 rounded-xl p-2 m-3 h-full w-[47%]"
              : "border-2 bg-gray-800 rounded-xl p-2 m-3 h-full w-[47%]"
          }`}
        >
          <div>
            <p className="text-sm text-blue-gray-200">
              {msg.username && <span>{msg.username} pisze:</span>}
            </p>
          </div>
          <div>
            <p className="w-full break-words px-2">{msg.message}</p>
          </div>
          <div className="text-end text-xs text-gray-500">
            <p>{msg.username && formatDateFromTimestamp(msg.creationTime)}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
