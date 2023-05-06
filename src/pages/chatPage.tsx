import Chat from "../components/Chat";
import Logo from "../components/logo";

const ChatPage = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-slate-700 text-cyan-50 grid grid-cols-menu grid-rows-menu h-screen w-screen p-5">
        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Logo />
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Pokój</p>
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Puste</p>
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Menu</p>
          </div>
        </div>

        <div className="border-2 flex flex-col h-full">
          <Chat />
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Użytkownicy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
