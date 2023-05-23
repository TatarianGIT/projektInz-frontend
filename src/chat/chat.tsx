import SendMessage from "./sendMessage";
import Messages from "./messages";
// import { useSocketIO } from "../hooks/useSocketIO";

export default function Chat({ socket, email, room }) {
  return (
    <>
      <div className="h-full overflow-y-auto">
        <div className="overflow-y-scroll row-span-4 ">
          <Messages socket={socket} email={email} room={room} />
        </div>
        <div className="absolute bottom-0 bg-[#242424] border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0 inset-x-0">
          <SendMessage socket={socket} email={email} room={room} />
        </div>
      </div>
    </>
  );
}
