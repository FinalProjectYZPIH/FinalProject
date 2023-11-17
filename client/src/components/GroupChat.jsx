import React, { useEffect, useState } from "react";
import { getTime } from "date-fns";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useProfileStore } from "../context/data/dataStore";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkLightMode } from "../context/data/dataStore.jsx";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from "./ui/Buttons";
import { useKeyPress } from "../utils/keyEvent";

function GroupChat() {
  //globale data
  const { username, chatRooms } = useProfileStore(
    (state) => state.defaultProfile
  );
  const { setChatRooms } = useProfileStore();
  const { chatName } = useParams();
  const navigate = useNavigate();
  console.log(chatName);

  const { socket, sendMessage, createRoom } = useSocketProvider();
  const { lightMode, setDarkMode } = useDarkLightMode();
  console.log(chatRooms);

  //localdata
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
  const [messageList, setMessageList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  console.log(chatRooms);

  useEffect(() => {
    const foundRoom = chatRooms?.find((room) => {
      return room?.chatName === chatName;
    });
    setMessageList([]);
    setMessageList(foundRoom.chatMessages);
    socket.emit("updateRoom", chatName);
    console.log("updateRoom", foundRoom.chatMessages);
  }, [chatName, ]);

  // hier wird die daten aus backend immer mit dazugehörigen room aktualisiert
  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("messages_groupRoom", (message, room) => {
        console.log(message);
        setMessageList((prev) => [...prev, message]);
        setChatRooms(room);
        console.log("roomtest", room);
        setCurrentRoom(room);
      });

      socket.on("joinRoom", (newParticipantRoom) => {
        setChatRooms(newParticipantRoom?.currentRoom);
      });
    }
    return () => {
      if (socket) {
        socket.off("messages_groupRoom");
        socket.off("joinRoom");
      }
    };
  }, [socket]);

  const storedData = JSON.parse(sessionStorage.getItem("Profile"));
  console.log("Stored Data:", storedData?.defaultProfile?.chatMessages);

  //versenden der nachricht
  const sendMessages = async (e) => {
    e.preventDefault();
    if (currentMessage.content !== "") {
      sendMessage(currentMessage, chatName, (cb) => console.log(cb));

      setCurrentMessage({
        ...defaultMessageObj,
        time: getTime(new Date()),
      });
    }
  };
  console.log(currentRoom);

  useKeyPress(() => sendMessages(), ["Enter"]);
  return (
    <div
      className={`chat-window font-orbitron w-screen h-screen ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <div className="chat-header border mt-5 border-cyan-400 rounded-lg p-5 h-4/5 w-auto shadow-lg backdrop-blur">
        <p>
          Live Chat {currentRoom?.participants.length || 0} Users are Online
        </p>
        <div className="chat-body flex flex-col border border-cyan-800 h-[500px] rounded-lg py-5 px-1">
          <ScrollToBottom className="overflow-x-hidden">
            {messageList?.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className={
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
        <div className="chat-footer flex fixed bottom-2 left-0">
          <form>
            <input
              className="bg-blue-950 bg-opacity-5 block w-full px-10 py-1 text-lg text-cyan-400 focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 border-b-2 rounded-lg border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:text-white focus:bg-sky-600 focus:bg-opacity-25 focus:border-blue-600 hover:border-b-cyan-400"
              type="text"
              value={currentMessage.content}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage({
                  ...currentMessage,
                  content: event.target.value,
                });
              }}
            />

            <div className="fixed bottom-1 right-0 w-32">
              <Button onClick={sendMessages}>GO</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;

// {
//   type: 'single',
//   chatName: 'SingleRoomName',
//   chatMessages: [{ content: 'Guten Nachmittag!', likes: 5, emojis: [] }],
//   participants: ['Yan', 'Zoe'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },
// {
//   type: 'group',
//   chatName: 'Room_League',
//   chatAdmin: 'Zoe',
//   chatMessages: [{ content: "Welcome to Zoe's Room", likes: 5, emojis: [] }],
//   participants: ['userid', 'user2', 'user3'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },
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
