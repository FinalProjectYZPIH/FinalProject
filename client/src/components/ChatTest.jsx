import React, { useEffect, useState } from "react";
import useSocketIo from "../libs/useSocketio";
import { useProfileStore } from "../context/data/dataStore";

export default function ChatTest() {
  const nameSpace = "admin";

  const [message, setMessage] = useState("")
  const [send, setSend] = useState(false)
  const { chatRooms } = useProfileStore((state) => state.defaultProfile);

  const { socket, sendMessage, createRoom } = useSocketIo("userid");
  useEffect(() => {
    if (socket) {
      // Hier kannst du auf Socket-Events hören und Aktionen ausführen
    //  socket.emit("sendMessage", message)
    // sendMessage({content: message})
    
    const messageObj = {
        content: message,
        likes: 5,
        emojis: ['😀', '👍'],
        
    };
    
    sendMessage(messageObj, fromServer => console.log(`${fromServer}`))
    createRoom(messageObj, "user2", messageObj)
    setSend(false)
    }
  }, [socket, send]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createRoom('MyRoomName', true); // Beispielaufruf für createRoom
        setSend(true)
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="border border-1" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button className="border border-1" type="submit">
          abschicken
        </button>
      </form>
      <div>
      <button
          onClick={() => {
            if (socket) {
              // Beispiel: Senden eines eigenen Socket-Events
              socket.emit('customEvent', { message: 'Hello, Socket!' });
            }
          }}
        >
          Eigene Nachricht senden
        </button>
        {/* <button
          className="cursor-pointer border boder-1 p-1 rounded"
          onClick={() => createRoom()}
        >
          createRoom
        </button> */}
      </div>
    </div>
  );
}
