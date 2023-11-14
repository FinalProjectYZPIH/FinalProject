import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../context/data/dataStore";
import { useState } from "react";
import { useSocketProvider } from "../context/data/SocketProvider";

import { redirect, Link } from "react-router-dom";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default function ChatSidebar() {
  const { chatRooms, isOnline } = useProfileStore(
    (state) => state.defaultProfile
  );

  const [select, setSelect] = useState(null)

  const navigate = useNavigate()


  const handleClick = (room) => {
    if (room?.type === "single") {
      setSelect(room?.participants[1])
      select === room?.participants[1] && redirect(`/chat/${room?.participants[1]}`)

    }
    if (room?.type === "group") {
      setSelect(room?.chatName)

      console.log(select)
    }
    console.log(room?.type, room?.chatName)
  }
  // console.log(urlRooms)
  return (
    <div className="h-screen w-80 font-orbitron ">
      <div className="w-60 h-3/4  overflow-y-scroll  rounded-xl m-5  border border-cyan-400  p-2  flex flex-col items-center ">
        Chats
        {console.log(chatRooms)}

        {chatRooms?.map((room) => {

          if (room?.type === "single") {
            return (
              <div className={`${select === room?.participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(room)} key={room?.participants[1]}>
                {room?.participants[1]}
              </div>
            );
          } else if (room?.type === "group") {
            return (
              <div className={`${select === room?.chatName ? "w-3/4 border border-cyan-400 p-2 m-1 rounded-lg text-center hover:bg-cyan-400 hover:bg-opacity-50" : "w-3/4 border border-cyan-600 p-2 m-1 rounded-lg text-right hover:bg-cyan-700 hover:bg-opacity-70"} cursor-pointer`} onClick={() => handleClick(room)} key={room?.chatName}>{select === room?.chatName ? <Link to={`/chat/${room?.chatName}`}>{room?.chatName}</Link> : room?.chatName}</div>
            );
          }

          // <GroupChat chatName={roomConfig?.chatName} messages={roomConfig} />
          return null;
        })}

      </div>
    </div>
  );
}
