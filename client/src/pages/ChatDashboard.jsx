import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupChat from "../components/GroupChat";
import ChatSidebar from "../components/ChatSidebar";
import { useParams } from "react-router-dom";
import DisplayBoard from "../components/DisplayBoard";
import { useSocketProvider } from "../context/data/SocketProvider";
import { Outlet } from "react-router-dom";

import { Button } from "../components/ui/Buttons";
import { useDarkLightMode } from "../context/data/dataStore";
import { Inputs } from "../components/ui/Inputs";

export default function ChatDashboard() {
  //globaldata
  const { defaultProfile, setLogout, setProfile, resetProfile } =
    useProfileStore();

  const { isOnline, userId, role, username, email } = useProfileStore(
    (state) => state.defaultProfile
  );
  //api
  let { roomName } = useParams();

  const navigate = useNavigate();
  const { data: userData, isSuccess, isError } = profileRequest("Yan");
  // console.log(userData.data);

  if (isSuccess) {
    setProfile({
      userId: userData?.data?.userId,
      role: userData?.data?.role,
      username: userData?.data?.username,
      email: userData?.data?.email,
      avatar: "avatar",
    });
  }
  if (isError) {
    window.location.reload();
    if (isOnline === false) {
      navigate("/login");
    }
  }
  console.log(userId, role, username, email);

  //socket
  const { socket, sendMessage, createRoom, roomConfig, setRoomConfig } =
    useSocketProvider();

  // local data
  const [roomname, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  //events
  const joinRoom = () => {
    if (username !== "" && roomname !== "") {
      // createRoom erstellt mit dem key "groupRoom oder singleRoom einen RoomObject der für Messages als einen Platzhalter gedacht ist "
      const roomData = createRoom(
        {
          attachMessages: [
            {
              sender: username,
              content: `welcome to ${roomname} Room`,
              likes: 0,
              emojis: [],
              images: [],
              voices: [],
              videos: [],
            },
          ],
          attachParticipants: ["user1", "user2"],
          attachComments: [{ like: 1 }],
          groupchat: true,
        },
        roomname
      );
      // roomName = roomname;
      console.log(roomData);
      setRoomConfig(roomData);
      // socket.emit("join_room", room);
      setShowChat(true);
      // navigate(`/chat/${roomName}`);
    }
  };

  const { lightMode, setDarkMode } = useDarkLightMode();

  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2  w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark" : "light"
      }`}
    >
      {!showChat ? (
        <div className="joinChatContainer">
          <div className="flex items-center flex-col ">
            <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
              Anzeigebildschirm
            </div>

            {isOnline && isSuccess ? (
              <div>{`${userData.data.username}`}</div>
            ) : (
              "failed to fetching userdata"
            )}
          </div>
          <div className="flex items-center justify-center flex-col h-1/3 mt-28 lg:ml-28">
            <h3>Join A Chat</h3>

            <Inputs
              type="text"
              label="Name"
              ph="who are you?"
              onChangeFn={(event) => {
                setUsername(event.target.value);
              }}
            />

            <Inputs
              type="text"
              label="Room"
              ph="choose a room"
              onChangeFn={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <div className="lg:ml-28">
            <Button onClick={joinRoom}>Join A Room</Button>
            <Button className="border border-1 p-1" onClick={handleLogout}>
              logout
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  );
}

// const groupChatData = {
//   chatName: "My Group Chat",
//   isGroupChat: true,
//   chatMessages: [], // Hier werden Nachrichten hinzugefügt
//   participants: [userId1, userId2], // Teilnehmer des Gruppenchats
//   chatAdmin: chatAdminUserId,
// };

// const messageData = {
//   sender: userId,
//   content: "Hello, this is a message!",
//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
// };
