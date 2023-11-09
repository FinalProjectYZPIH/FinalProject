import { useProfileStore, useRooms } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import toast from "react-hot-toast";
=======
>>>>>>> origin/yan
import GroupChat from "../components/GroupChat";
import ChatSidebar from "../components/ChatSidebar";
import { useParams } from "react-router-dom";
// import DisplayBoard from "../components/DisplayBoard";
import { useSocketProvider } from "../context/data/SocketProvider";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import { Button } from "../components/ui/Buttons";
import { useDarkLightMode } from "../context/data/dataStore";
import { Inputs } from "../components/ui/Inputs";

export default function ChatDashboard() {
  const { defaultProfile, setLogout,resetProfile,setProfile } = useProfileStore();
=======

export default function ChatDashboard() {
  //globaldata
  const {
    defaultProfile,
    setLogout,
    setProfile,
    resetProfile,
    setChatRooms,
    chatRooms,
  } = useProfileStore();
>>>>>>> origin/yan

  const { isOnline, userId, role, username, email } = useProfileStore(
    (state) => state.defaultProfile
  );

  // const { setRooms } = useRooms();

  //api
<<<<<<< HEAD
  let { roomName } = useParams();
=======
>>>>>>> origin/yan

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
<<<<<<< HEAD
=======
    setLogout();
    window.location.reload();
>>>>>>> origin/yan
    if (isOnline === false) {
      navigate("/login");
      setLogout() && toast.success("You are logged out");
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
          attachParticipants: [
            "6549298316dca878ff3e508d",
            "654929ca16dca878ff3e509c",
          ], //zoe pawel
          attachComments: [{ like: 1 }],
          groupchat: true,
        },
        roomname
      );
      // roomName = roomname;
      console.log("createRoom>>", roomData);
      setRoomConfig(roomData);
      setChatRooms(roomData);
      // socket.emit("join_room", room);
      setShowChat(true);
      // navigate(`/chat/${roomName}`);
    }
  };

<<<<<<< HEAD
  const { lightMode, setDarkMode } = useDarkLightMode();

  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center  bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark" : "light"
      }`}
    >
      {/* <ChatSidebar /> */}
      {/* <DisplayBoard /> */}
      {!showChat ? ( //hier soll für 2. sidebar gedacht sein. wenn der user in navbar klickt, es soll dann angezeigt werden.
        <div className=" flex flex-col justify-evenly items-center">
          <div className="h-3/5 w-96 px-5 flex justify-evenly flex-col items-center border border-slate-400 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
            <h3 className="text-4xl">Create or Join a Existing ChatRoom</h3>
            <Inputs
              className="border border-1"
              type="text"
              ph="Create or join a Room"
              onChangeFn={(event) => {
                setRoomName(event.target.value);
              }}
            />
            <div className="w-full">
              <Button onClick={joinRoom}>Join a Room</Button>
            </div>
          </div>
        </div>
      ) : (
        navigate(`/chat/${roomname}`)
        // <GroupChat />
=======
  return (
    <div className="App flex justify-between">
      {/* <ChatSidebar /> */}
      {/* <DisplayBoard /> */}
      {!showChat ? ( //hier soll für 2. sidebar gedacht sein. wenn der user in navbar klickt, es soll dann angezeigt werden.
        <div>
          <h3>Create or Join a Existing ChatRoom</h3>
          <input
            className="border border-1"
            type="text"
            placeholder="Create or Join a Room"
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <>
          {/* {setRooms(roomname)} */}
          {navigate(`/chat/${roomname}`)}
          {/** <GroupChat />*/}
        </>
>>>>>>> origin/yan
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
