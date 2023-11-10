import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GroupChat from "../components/GroupChat";
import ChatSidebar from "../components/ChatSidebar";
import { useParams } from "react-router-dom";
// import DisplayBoard from "../components/DisplayBoard";
import { useSocketProvider } from "../context/data/SocketProvider";
import { Outlet } from "react-router-dom";
import { useDarkLightMode } from "../context/data/dataStore";
import { Inputs } from "../components/ui/Inputs";
import { Button } from "../components/ui/Buttons";
import FriendRequests from "../components/FriendRequests";


export default function ChatDashboard() {
  const { defaultProfile, setLogout,resetProfile,setProfile } = useProfileStore();

  const { isOnline, userId, role, username, email, userIdDB } = useProfileStore(
    (state) => state.defaultProfile
  );
  //api
  let { roomName } = useParams();

  const navigate = useNavigate();
  const { data: userData, isSuccess, isError} = profileRequest("Yan");
  // console.log(userData.data);

  if (isSuccess) {
    setProfile({
      userIdDB: userData?.data?._id,
      userId: userData?.data?.userId,
      role: userData?.data?.role,
      username: userData?.data?.username,
      email: userData?.data?.email,
      avatar: "avatar",
    });
  }
  if (isError) {
    if (isOnline === false) {
      navigate("/login");
      setLogout() && toast.success("You are logged out");
    }
  }
  console.log(userIdDB,userId, role, username, email);

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
    <div className="App">
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
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
          <button className="border border-1 p-1" onClick={handleLogout}>
            logout
          </button>
        </>
      )}

      {/* <button onClick={()=>{setFriendsRequestsList(!friendsRequestsList)}}>
        Friends Requests
      </button>

      {friendsRequestsList === true &&
        <FriendRequests userId = {userData.data._id} />} */}

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
