import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../context/data/dataStore";
import { useState } from "react";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default function ChatSidebar() {
  const { chatRooms, isOnline } = useProfileStore(
    (state) => state.defaultProfile
  );

  const [select, setSelect] = useState(null)

  const navigate = useNavigate()

  console.log(chatRooms);


    const handleClick = (room) => {
      if(room.singleroom){
        setSelect(room.singleroom.participants[1])
      }
      if(room.grouproom){
        setSelect(room.grouproom.chatName)
      }
    }

  return (
    <div className="w-20">
      Chatsidebar
      {chatRooms.map((room) => {
        if (room.singleroom) {
          return (
            <div className= {`${select === room.singleroom.participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(room)} key={room.singleroom.participants[1]}>
              {room.singleroom.participants[1]} {select === room.singleroom.participants[1] && navigate(`${room.singleroom.participants[1]}`)}
            </div>
          );
        } else if (room.grouproom) {
          return (
            <div className= {`${select === room.grouproom.chatName ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(room)} key={room.grouproom.chatName}>{room.grouproom.chatName}{select === room.grouproom.chatName && navigate(`${room.grouproom.chatName}`)}</div>
          );
        }
      })}
    </div>
  );
}
