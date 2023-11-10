import React, { useEffect, useState } from "react";
import { getTime } from "date-fns";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useProfileStore } from "../context/data/dataStore";
import { useDarkLightMode } from "../context/data/dataStore.jsx";
import { Inputs } from "./ui/Inputs";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from "./ui/Buttons";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation.jsx";

// {groupRoom :{
//   chatMessages: [...attachMessages],
//   participants: [...attachParticipants],
//   comments: [...attachComments],
//   chatName: roomName,
//   groupchat: groupchat,
//   chatAdmin: userId
// }}
// {singleRoom : {
//   chatMessages: [...attachMessages],
//   participants: [userId, ...attachParticipants], // hier sollen nur 2 users sein
//   comments: [...attachComments]
// }}
// messageData = {
//   sender: userId,
//   content: content,
//   likes,
//   emojis,
//   images,
//   voices,
//   videos,
//   time:
//   new Date(Date.now()).getHours() +
//   ":" +
//   new Date(Date.now()).getMinutes(),
// };
function GroupChat() {
  const { username } = useProfileStore((state) => state.defaultProfile);
  const { socket, sendMessage, roomConfig, setRoomConfig } =
    useSocketProvider();
  const { lightMode } = useDarkLightMode();
  const { setChatRooms } = useProfileStore();
  const { chatName } = useParams();
  const navigate = useNavigate();
  console.log(chatName);
  console.log(roomConfig);
  const defaultMessageObj = {
    content: "",
    likes: 0,
    emojis: [],
    images: [],
    voices: [],
    videos: [],
  };
  const [currentMessage, setCurrentMessage] = useState({
    ...defaultMessageObj,
    time: getTime(new Date()),
  });

  useEffect(() => {
    console.log(chatName);
  }, [chatName]);

  const [messageList, setMessageList] = useState(
    roomConfig.groupRoom.chatMessages
  );

  console.log(roomConfig.groupRoom.chatMessages);
  console.log(roomConfig.groupRoom.chatAdmin);

  // useEffect(() => {
  //   setRoomConfig((prev) => produce(() => ({...prev, chatName: chatName})))
  // },[])

  // hier wird die daten aus backend immer mit dazugehörigen room aktualisiert
  useEffect(() => {
    socket.on("messages_groupRoom", (message, room) => {
      console.log(message);
      setMessageList((list) => [...list, message]);
      setChatRooms(room);
    });
  }, [socket]);

  const sendMessages = async () => {
    if (currentMessage.content !== "") {
      const message = sendMessage(currentMessage, (cb) => console.log(cb));
      console.log(message);
      setCurrentMessage(message);

      setMessageList((list) => [...list, message]);
      setCurrentMessage({
        ...defaultMessageObj,
        time: getTime(new Date()),
      });
    }
  };
  console.log(messageList);
  return (
    <div
      className={`chat-window font-orbitron grid grid-cols-1 w-screen h-screen sm:bg-cover mt-2 sm:bg-center  bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <Navigation />
      <div className="chat-header border border-cyan-400 rounded-lg p-5 m-5 h-3/4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
        <p>Live Chat</p>
        <div className="chat-body flex flex-col border border-cyan-800 h-[500px] rounded-lg py-5 px-2">
          <ScrollToBottom className="overflow-x-hidden">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className={
                    username === messageContent.author ||
                    username === messageContent.sender
                      ? "self-message flex justify-end rounded-lg break-words"
                      : "other-message flex justify-start rounded-lg break-words  "
                  }
                >
                  <div>
                    <div className="message-content w-60 border border-cyan-400 p-2 m-1 rounded-lg ">
                      <p>{messageContent.content}</p>
                      <div className="message-meta flex justify-end text-xs p-2">
                        <p id="author">{messageContent.sender}</p>
                        <p className="pl-2" id="time">
                          {messageContent.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer flex fixed bottom-1">
          <Inputs
            type="text"
            value={currentMessage.content}
            placeholder="Hey..."
            onChangeFn={(event) => {
              setCurrentMessage({
                ...currentMessage,
                content: event.target.value,
              });
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessages();
            }}
          />
          <div className="mt-4 py-1 w-36">
            <Button onClick={sendMessages}>GO</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;

// import React, { useEffect, useState } from "react";
// // import ScrollToBottom from "react-scroll-to-bottom";

// function Chat({ socket, username, room }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage("");
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         {/* <ScrollToBottom className="message-container"> */}
//           {messageList.map((messageContent) => {
//             return (
//               <div
//                 className="message"
//                 id={username === messageContent.author ? "you" : "other"}
//               >
//                 <div>
//                   <div className="message-content">
//                     <p>{messageContent.message}</p>
//                   </div>
//                   <div className="message-meta">
//                     <p id="time">{messageContent.time}</p>
//                     <p id="author">{messageContent.author}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         {/* </ScrollToBottom> */}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={currentMessage}
//           placeholder="Hey..."
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
