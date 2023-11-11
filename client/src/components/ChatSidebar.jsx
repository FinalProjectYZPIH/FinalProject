import { useNavigate } from "react-router-dom";
import { useProfileStore, useRooms } from "../context/data/dataStore";
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
      if(room?.type === "single"){
        setSelect(room?.participants[1])
        select === room?.participants[1] && redirect( `/chat/${room?.participants[1]}`)
        
      }
      if(room?.type === "group"){
        setSelect(room?.chatName)
        
        console.log(select)
      }
      console.log(room?.type,room?.chatName)
    }
    // console.log(urlRooms)
  return (
    <div className="w-20">
      Chatsidebar
     {console.log(chatRooms)}

      {chatRooms?.map((room) => {

          if (room?.type === "single") {
            return (
              <div className= {`${select === room?.participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(room)} key={room?.participants[1]}>
              {room?.participants[1]} 
            </div>
          );
        } else if (room?.type === "group") {
          return (
            <div className= {`${select === room?.chatName ? "bg-slate-600" : "bg-red-500"} cursor-pointer`} onClick={() => handleClick(room)} key={room?.chatName}>{select === room?.chatName ? <Link to={`/chat/${room?.chatName}`}>{room?.chatName}</Link> : room?.chatName}</div>
            );
          }
        
          // <GroupChat chatName={roomConfig?.chatName} messages={roomConfig} />
        return null;
      })}

    </div>
  );
}
