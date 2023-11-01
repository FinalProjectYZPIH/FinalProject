// import React, { useEffect, useState } from "react";
// import useSocketIo from "../libs/useSocketio";
// import { useProfileStore } from "../context/data/dataStore";

// export default function ChatTest() {
//   const nameSpace = "admin";

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")
//   const [send, setSend] = useState(false)
//   const { chatRooms } = useProfileStore((state) => state.defaultProfile);

//   const { socket, sendMessage, createRoom } = useSocketIo("userid");
//   useEffect(() => {
//     if (socket) {
//       // Hier kannst du auf Socket-Events hören und Aktionen ausführen
//     //  socket.emit("sendMessage", message)
//     // sendMessage({content: message})
    
//     let messages =[] ;
//     const messageObj = {
//         content: message,
//         likes: 5,
//         emojis: ['😀', '👍'],
        
//     };
//     messages.push(messageObj)
//     sendMessage(messageObj, fromServer => console.log(`${fromServer}`))
//     createRoom(messages, "user2", messages)// wenn man nur room speichern möchte dann nur createRoom weitergeben

//     setMessages( prev => [...prev, messageObj])

//     setSend(false)
//     }
//   }, [socket, send]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//         setSend(true)
// }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input className="border border-1" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
//         <button className="border border-1" type="submit">
//           abschicken
//         </button>
//       </form>
//       <div>
//       <button
//           onClick={() => {
//             if (socket) {
//               // Beispiel: Senden eines eigenen Socket-Events
//               socket.emit('customEvent', { message: 'Hello, Socket!' });
//             }
//           }}
//         >
//           Eigene Nachricht senden
//         </button>
//       </div>


//       <div>Anzeige{messages.map(message => {
//         return <div key={`${message.content}${message.content.length}`}>{message.content}</div>
//       })}</div>
//     </div>
//   );
// }
