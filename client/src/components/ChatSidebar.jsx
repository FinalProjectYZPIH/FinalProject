import { useNavigate } from "react-router-dom";
import { useProfileStore, useRooms } from "../context/data/dataStore";
import { useState } from "react";
import { useSocketProvider } from "../context/data/SocketProvider";
import { Link } from "lucide-react";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default function ChatSidebar() {
  const { chatRooms, isOnline } = useProfileStore(
    (state) => state.defaultProfile
  );

  // const { setChatRooms } = useProfileStore();  
  // const {rooms } = useRooms()
  const [select, setSelect] = useState(null)

  const navigate = useNavigate()

 

// console.log(rooms)
    const handleClick = (room) => {
      if(room.singleRoom){
        setSelect(room.singleroom.participants[1])
        select === room.singleRoom.participants[1] && navigate( `/chat/${room.singleRoom.participants[1]}`)
      }
      if(room.groupRoom){
        setSelect(room.groupRoom.chatName)
        select === room.groupRoom?.chatName && navigate(`/chat/${room?.groupRoom.chatName}`)
        console.log(select)
      }
      console.log(room)
    }

  return (
    <div className="w-20">
      Chatsidebar
    {console.log(chatRooms)}

    {/* {chatRooms.map(value => (<div className="cursor-pointer" key={value}><Link to={`/chat/${value}`}>test{value}</Link></div>))} */}
      {(chatRooms || [])?.map((room) => {
        if(room){
          if (room.singleroom) {
            return (
              <div className= {`${select === room.singleRoom.participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(room)} key={room.singleRoom.participants[1]}>
              {room.singleRoom.participants[1]} 
            </div>
          );
        } else if (room.groupRoom) {
          return (
            <div className= {`${select === room?.groupRoom.chatName ? "bg-slate-600" : "bg-red-500"} cursor-pointer`} onClick={() => handleClick(room)} key={room?.groupRoom.chatName}>{room?.groupRoom.chatName}</div>
            );
          }
        }
        
        return null;
      })}

    </div>
  );
}
