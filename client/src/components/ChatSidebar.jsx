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
  // const { setChatRooms } = useProfileStore();  
  // const {rooms } = useRooms()
  const [select, setSelect] = useState(null)

  const navigate = useNavigate()

  const {urlRooms } = useSocketProvider()

 

// console.log(rooms)
    // const handleClick = (type, chatName, participants) => {
    //   if(type === "single"){
    //     setSelect(participants[1])
    //     select === participants[1] && navigate( `/chat/${participants[1]}`)
    //   }
    //   if(type === "group"){
    //     setSelect(chatName)
    //     select === chatName && navigate(`/chat/${chatName}`)
    //     console.log(select)
    //   }
    //   console.log(type,chatName)
    // }

    const handleClick = (type, chatName, participants) => {
      if(type === "single"){
        setSelect(participants[1])
        select === participants[1] && redirect( `/chat/${participants[1]}`)
        
      }
      if(type === "group"){
        setSelect(chatName)
        
        console.log(select)
      }
      console.log(type,chatName)
    }
    console.log(urlRooms)
  return (
    <div className="w-20">
      Chatsidebar
     {console.log(chatRooms)}

      {/* {(urlRooms || [])?.map((room) => {
        const chatKey = Object.keys(room)[0]
        const {type, participants, chatName} = room[chatKey]  // die room[chatKey] w an backend weitergegeben

          if (type === "single") {
            return (
              <div className= {`${select === participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(type, chatName, participants)} key={participants[1]}>
              {participants[1]} 
            </div>
          );
        } else if (type === "group") {
          return (
            <div className= {`${select === chatName ? "bg-slate-600" : "bg-red-500"} cursor-pointer`} onClick={() => handleClick(type, chatName, participants)} key={chatName}>{chatName}</div>
            );
          }
        
        
        return null;
      })} */}
      
      {(chatRooms || [])?.map(({type, chatName, participants }) => {

          if (type === "single") {
            return (
              <div className= {`${select === participants[1] ? "bg-slate-600" : ""} cursor-pointer`} onClick={() => handleClick(type, chatName, participants)} key={participants[1]}>
              {participants[1]} 
            </div>
          );
        } else if (type === "group") {
          return (
            <div className= {`${select === chatName ? "bg-slate-600" : "bg-red-500"} cursor-pointer`} onClick={() => handleClick(type, chatName, participants)} key={chatName}>{select === chatName ? <Link to={`/chat/${chatName}`}>{chatName}</Link> : chatName}</div>
            );
          }
        
        
        return null;
      })}

    </div>
  );
}
