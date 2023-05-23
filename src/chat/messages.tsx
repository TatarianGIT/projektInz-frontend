import { useEffect, useRef, useState } from "react";

const Messages = ({ socket, email, room }) => {
  const [messagesReceived, setMessagesReceived] = useState<
    { message: string; email: string; creationTime: string }[]
  >([]);

  // const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", ({ ...data }) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          email: data.email,
          creationTime: data.creationTime,
        },
      ]);
    });

    socket.on("setMessages", function (messages) {
      setMessagesReceived(messages);
    });

    // socket.on("setRoom", function (room) {
    //   setRoom(room);
    // });

    // Remove event listener on component unmount
    return () => socket.off("receiveMessage");
  }, [socket]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { timeZone: "UTC" });
  }

  return (
    <div className="w-full max-h-full pb-[5.2rem]">
      {messagesReceived.map((msg, i) => (
        <div
          className={`border-2 rounded-xl p-2 m-3 h-full w-[40%] 
          ${email == msg.email ? "ml-auto" : ""} 
          ${email == msg.email ? "ml-auto" : ""}`}
          key={i}
        >
          <p>{formatDateFromTimestamp(msg.creationTime)}</p>
          <p className="w-full">{msg.message}</p>
          <br />
          <div>
            <span>{msg.email}</span>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
