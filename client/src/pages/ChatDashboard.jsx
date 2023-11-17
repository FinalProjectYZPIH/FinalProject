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
import FriendRequests from "../components/FriendRequests";

import { useDarkLightMode, useColorStore } from "../context/data/dataStore.jsx";
import { Inputs } from "../components/ui/Inputs.jsx";
import { Button, ColorButton } from "../components/ui/Buttons.jsx";
import Navigation from "../components/Navigation.jsx";

export default function ChatDashboard() {
  //globaldata
  const { defaultProfile, resetProfile, setProfile, setChatRooms, setLogout } =
    useProfileStore();

  const { isOnline, userId, role, username, email, userIdDB, chatRooms } =
    useProfileStore((state) => state.defaultProfile);
  console.log(userId, role, username, email, userIdDB);
  // console.log(userData.data);

  //socket
  const { socket, sendMessage, createRoom } = useSocketProvider();

  // local data
  const [roomname, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);
  // const [roomConfig, setRoomConfig] = useState({});

  //api

  const navigate = useNavigate();
  const { data: userData, isSuccess, isError } = profileRequest("Yan");

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

  if (isOnline === false) {
    navigate("/", { replace: true });
    toast.error("You are offline");

    // setLogout();
    // window.location.reload();

    // if (isOnline === false) {
    //   navigate("/login");
    //   setLogout() && toast.success("You are logged out");
    // }
  }

  console.log(userId, role, username, email);

  //events
  const joinRoom = () => {
    if (username !== "" && roomname !== "") {
      // createRoom erstellt mit dem key "groupRoom oder singleRoom einen RoomObject der für Messages als einen Platzhalter gedacht ist "
      const roomData = createRoom(
        {
          attachMessages: [
            // {
            //   sender: username,
            //   content: `welcome to ${roomname} Room`,
            //   likes: 0,
            //   emojis: [],
            //   images: [],
            //   voices: [],
            //   videos: [],
            // },
          ],
          attachParticipants: [
            "6549298316dca878ff3e508d",
            "654929ca16dca878ff3e509c",
          ], //zoe pawel
          attachComments: [{ like: 1 }],
          type: "group",
        },
        roomname
      );
      console.log("createRoom>>", roomData);
      // setRoomConfig(roomData);
      setChatRooms(roomData);
      setShowChat(true);
      // navigate(`/chat/${roomName}`);
    }
  };

  const { lightMode, setDarkMode } = useDarkLightMode();
  const { colorPosition, setColorPosition, setSpecificColor, color } =
        useColorStore();

  return (
    <div
      className={`font-orbitron w-screen h-screen ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <Navigation />
      {/* <ChatSidebar /> */}
      {/* <DisplayBoard /> */}
      {!showChat ? ( //hier soll für 2. sidebar gedacht sein. wenn der user in navbar klickt, es soll dann angezeigt werden.
        <div className={`flex flex-col mt-5 h-4/5 items-center`}>
          <div className={`h-full w-full px-5 flex justify-evenly flex-col items-center border border-cyan-400 rounded-lg shadow-lg ${color}`}>
            <h3 className="text-4xl">Create or join a existing ChatRoom</h3>
            <Inputs
              className="border border-1"
              type="text"
              ph="Create or join a Room"
              onChangeFn={(event) => {
                setRoomName(event.target.value);
              }}
            />
            <div className="w-full">
              <ColorButton onClick={joinRoom}>Join a Room</ColorButton>
            </div>
          </div>
        </div>
      ) : (
        navigate(`/chat/${roomname}`)
        // <GroupChat />
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
