import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pl";

dayjs.extend(duration);
dayjs.extend(relativeTime);

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
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          creationTime: data.creationTime,
        },
      ]);
    });

    socket.on("getLastMessages", function (messages) {
      console.log("MESSAGES:", messages);
      if (messages) {
        setMessagesReceived([...messages]);
      }
    });

    socket.on("setMessages", function (messages) {
      setMessagesReceived(messages);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  console.log("messagesReceived", messagesReceived);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesReceived]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { timeZone: "UTC" });
  }

  return (
    <div className="h-full overflow-y-scroll lg:max-h-[45rem] flex flex-col gap-6 pb-6 lg:px-2">
      {messagesReceived &&
        messagesReceived?.map((item, index) => {
          if (!item?.username) {
            return (
              <div
                className="text-gray-800 text-center self-center text-base px-8 py-2 bg-gray-200 rounded-full font-medium"
                key={index}
              >
                {item?.message}
              </div>
            );
          }

          const diff = dayjs(item?.creationTime).diff(new Date(), "minutes");
          const duration = dayjs
            .duration(diff, "minutes")
            .locale("pl")
            .humanize();
          const humanizedDuration = `${duration} temu`;

          if (item?.username === username) {
            return (
              <div className={`flex items-start gap-4 ml-auto`} key={index}>
                <div className="flex flex-col">
                  <div
                    className={`text-white flex flex-col bg-secondary py-3 px-6 text-base break-words max-w-[14rem] lg:max-w-[30rem] ${
                      item?.message?.length > 100
                        ? "rounded-2xl"
                        : "rounded-full"
                    }`}
                  >
                    {item?.message?.trim()}
                  </div>
                  <div className="text-gray-500 text-xs font-normal mt-1 mr-3 self-end">
                    {humanizedDuration}
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full overflow-hidden grow-0 shrink-0">
                  <img
                    src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${item?.username}`}
                    alt="Avatar"
                    className="w-12 h-12"
                  />
                </div>
              </div>
            );
          }

          return (
            <div className={`flex items-start gap-4`} key={index}>
              <div className="bg-gray-200 rounded-full overflow-hidden mt-5 grow-0 shrink-0">
                <img
                  src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${item?.username}`}
                  alt="Avatar"
                  className="w-12 h-12"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm ml-4 font-bold">
                  {item?.username}
                </span>
                <div
                  className={`text-gray-700 flex flex-col bg-gray-100 py-3 px-6 text-base break-words max-w-[14rem] lg:max-w-[30rem] ${
                    item?.message?.length > 100 ? "rounded-2xl" : "rounded-full"
                  }`}
                >
                  {item?.message?.trim()}
                </div>
                <div className="text-gray-500 text-xs font-normal mt-1 ml-3">
                  {humanizedDuration}
                </div>
              </div>
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
