import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSocketProvider } from "../context/data/SocketProvider";
import { toast } from "react-hot-toast";

import {
  useDarkLightMode,
  useProfileStore,
  useColorStore,
} from "../context/data/dataStore";

import { ColorTheme } from "./ui/ColorTheme.jsx";

import { redirect, Link } from "react-router-dom";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default function ChatSidebar() {
  const { chatRooms, isOnline, username } = useProfileStore(
    (state) => state.defaultProfile
  );
  const { deleteChatRooms } = useProfileStore();
  const { socket } = useSocketProvider();
  const { lightMode, setDarkMode } = useDarkLightMode();

  const [select, setSelect] = useState(null);
  const navigate = useNavigate();
  const { color } =
    useColorStore();

  const handleLeave = (roomName) => {
    if (socket) {
      deleteChatRooms(roomName);
      socket.emit("leaveRoom", { roomName, username });
    }
  };
  useEffect(() => {
    if (socket) {
      // Fügen Sie einen Event-Listener für den "leaveRoom"-Event hinzu
      socket.on("leavedRoom", (data) => {
        toast.success(
          `User with ID: ${data.participants.find(
            (id) => id !== userId
          )} left room: ${data?.chatName}`
        );
        // Fügen Sie hier die Logik hinzu, um den verlassenen Raum aus der Anzeige zu entfernen (z.B. setChatRooms)
      });
    }

    // Cleanup: Entfernen Sie den Event-Listener beim Komponentenabbau
    return () => {
      if (socket) {
        socket.off("leavedRoom");
      }
    };
  }, [socket, handleLeave]);

  const handleClick = (room) => {
    if (room?.type === "single") {
      setSelect(room?.participants[1]);
    }
    if (room?.type === "group") {
      setSelect(room?.chatName);
      console.log(select);
    }

    console.log(room?.type, room?.chatName);
  };
  // console.log(urlRooms)
  return (
    <div
      className={`h-screen w-72 font-orbitron ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <div
        className={` h-4/5 mt-5 mx-2  overflow-x-hidden shadow-lg  rounded-xl border border-cyan-400 flex flex-col items-center ${color}`}
      >
        Chats
        {/* <h3>{username}</h3> */}
        {console.log(chatRooms)}
        {chatRooms?.map((room) => {
          if (room?.type === "single") {
            return (
              <div
                className={`${
                  select === room?.participants[1] ? "bg-slate-600" : ""
                } cursor-pointer`}
                onClick={() => handleClick(room)}
                key={room?.participants[1]}
              >
                {select === room?.participants[1] ? (
                  <Link to={`/chat/${room?.participants[1]}`}>
                    {room.participants[1]}
                  </Link>
                ) : (
                  room?.participants[1]
                )}
              </div>
            );
          } else if (room?.type === "group") {
            return (
              <div
                className={`${color} ${
                  select === room?.chatName
                    ? "w-3/4 border border-cyan-400 p-2 m-1 rounded-lg text-center hover:bg-cyan-400 hover:bg-opacity-50"
                    : "w-3/4 border border-cyan-600 p-2 m-1 rounded-lg text-right hover:bg-cyan-700 hover:bg-opacity-70"
                } cursor-pointer`}
                onClick={() => handleClick(room)}
                key={room?.chatName}
              >
                {select === room?.chatName ? (
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-red-500 text-black rounded-full p-1 h-6 leading-4"
                      onClick={() => handleLeave(room?.chatName)}
                    >
                      X
                    </button>
                    <Link to={`/chat/${room?.chatName}`}>
                      {" "}
                      to- {room?.chatName}
                    </Link>
                  </div>
                ) : (
                  room?.chatName
                )}
              </div>
            );
          }

          // <GroupChat chatName={roomConfig?.chatName} messages={roomConfig} />
          return null;
        })}
      </div>
    </div>
  );
}
