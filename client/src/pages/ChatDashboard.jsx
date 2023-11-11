import { useProfileStore, useRooms } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupChat from "../components/GroupChat";
import ChatSidebar from "../components/ChatSidebar";
import { useParams } from "react-router-dom";
import DisplayBoard from "../components/DisplayBoard";
import { useSocketProvider } from "../context/data/SocketProvider";
import { Outlet } from "react-router-dom";

export default function ChatDashboard() {
  
  

  //globaldata
  const {
    defaultProfile,
    resetProfile,
    setProfile,
    setChatRooms,
    setLogout,
  } = useProfileStore();

  const { isOnline, userId, role, username, email, userIdDB, chatRooms } = useProfileStore(
    (state) => state.defaultProfile
  );
  console.log(userId, role, username, email, userIdDB);
  // console.log(userData.data);

  //socket
  const { socket, sendMessage, createRoom } =
    useSocketProvider();

  // local data
  const [roomname, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);
  // const [roomConfig, setRoomConfig] = useState({});

  //api
  
  const navigate = useNavigate();
  const { data: userData, isSuccess, isError } = profileRequest("Yan");
  
  if (isSuccess) {
    setProfile({
      userIdDB : userData?.data?._id,
      userId: userData?.data?.userId,
      role: userData?.data?.role,
      username: userData?.data?.username,
      email: userData?.data?.email,
      avatar: "avatar",
    });
  }
  if (isError) {
    setLogout();
    window.location.reload();
    if (isOnline === false) {
      navigate("/");
    }
  }

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
          type :"group",
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

  return (
    <div className="App flex justify-between">

      {!showChat ? ( //hier soll für 2. sidebar gedacht sein. wenn der user in navbar klickt, es soll dann angezeigt werden.
        <div>
          <h3>Create or Join a Existing ChatRoom</h3>
          <input
            type="text"
            placeholder="John..."
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
           {/* <GroupChat chatName={roomConfig?.chatName} messages={roomConfig} /> */}
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

