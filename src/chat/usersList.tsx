import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineArrowDown } from "react-icons/ai";

const UsersList = ({ socket, room, email, username }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on("chatRoomUsers", (data) => {
      setRoomUsers(data);
    });

    return () => {
      socket.off("chatRoomUsers");
    };
  }, [socket]);

  socket.on("setRoomUsers", function (roomUsersEmpty) {
    setRoomUsers(roomUsersEmpty);
  });

  if (!roomUsers || !roomUsers?.length) return null;

  return (
    <>
      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
        <span
          className="text-base text-gray-700 text-center"
          onClick={() => setIsOpen(true)}
        >
          {/* Użytkownicy online {`[${roomUsers?.length ?? 0}]`} */}
          <div className="flex w-full gap-1 justify-center items-center">
            Użytkownicy online:
            {roomUsers.length > 3 ? (
              <div className="flex gap-1 justify-center items-center">
                {`${roomUsers?.length ?? 0}`} (
                {`${(roomUsers?.length ?? 0) - 3} `}więcej){" "}
                <AiOutlineArrowDown
                  className="dark:border-darkTextSecondaryColor border-gray-700 border rounded-full"
                  size={20}
                />
              </div>
            ) : (
              <span>{`${roomUsers?.length ?? 0}`}</span>
            )}
          </div>
        </span>
        <div className="flex lg:flex-col lg:gap-2 gap-2 px-4">
          {roomUsers?.slice(0, 3).map((item, index) => (
            <div className="flex items-center gap-3" key={index}>
              <div className="bg-gray-200 dark:bg-darkTextSecondaryColor rounded-md relative shrink-0 grow-0">
                <img
                  src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${item?.username}`}
                  alt="Avatar"
                  className="w-10 h-10"
                />
                <div className="bg-green-500 w-3 h-3 rounded-full absolute -right-1 -bottom-1"></div>
              </div>
              <span className="text-lg font-semibold text-textPrimaryColor dark:text-darkTextPrimaryColor leading-tight">
                {item?.username}
              </span>
            </div>
          ))}{" "}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        className="lg:h-1/2 lg:w-1/2 lg:overflow-scroll border bg-white dark:bg-gray-800 w-full h-full lg:top-1/2 lg:left-1/2 lg:right-auto lg:bottom-auto lg:-mr-[50%] lg:translate-y-1/2 lg:translate-x-1/2"
      >
        {/* <div onClick={() => setIsOpen(false)}>Zamknij</div> */}
        <div className="flex justify-end w-full">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={
              "dark:text-darkTextPrimaryColor dark:bg-gray-800  text-black hover:bg-primary hover:text-white dark:hover:text-white border-2 transition border-primary rounded-full px-2 py-1.5 text-lg mr-4 mt-4"
            }
          >
            Zamknij
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-base text-gray-700 text-center">
            Użytkownicy online: {`${roomUsers?.length ?? 0}`}
          </span>
          <div className="flex flex-col lg:gap-3 gap-2 px-4 pl-5 pb-5">
            {roomUsers?.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                <div className="bg-gray-200 dark:bg-darkTextSecondaryColor rounded-md relative">
                  <img
                    src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${item?.username}`}
                    alt="Avatar"
                    className="w-10 h-10"
                  />
                  <div className="bg-green-500 w-3 h-3 rounded-full absolute -right-1 -bottom-1"></div>
                </div>
                <span className="text-lg font-semibold text-textPrimaryColor dark:text-darkTextPrimaryColor leading-tight">
                  {item?.username}
                </span>
              </div>
            ))}{" "}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UsersList;
