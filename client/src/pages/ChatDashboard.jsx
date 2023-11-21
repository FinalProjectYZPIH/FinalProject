import { useProfileStore } from "../context/data/dataStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSocketProvider } from "../context/data/SocketProvider";

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

  const { lightMode, setDarkMode } = useDarkLightMode();
  const { colorPosition, setColorPosition, setSpecificColor, color } =
    useColorStore();
  //socket
  const { socket, sendMessage, createRoom } = useSocketProvider();

  // local data
  const [roomname, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();

  if (isOnline === false) {
    navigate("/", { replace: true });
    toast.error("You are offline");
  }

  console.log(userId, role, username, email);

  //events
  const joinRoom = () => {
    if (username !== "" && roomname !== "") {
      // createRoom erstellt mit dem key "groupRoom oder singleRoom einen RoomObject der für Messages als einen Platzhalter gedacht ist "
      const roomData = createRoom(
        {
          attachMessages: [],
          attachParticipants: [userId],
          attachComments: [{ like: 1 }],
          type: "group",
        },
        roomname
      ); 
      console.log("createRoom>>", roomData);

      socket.emit("joinRoom", roomData, username);
      setChatRooms(roomData);

    }
    setShowChat(true);
  };


  return (
    <div
      className={`font-orbitron w-screen h-screen ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <Navigation />

      {!showChat ? ( //hier soll für 2. sidebar gedacht sein. wenn der user in navbar klickt, es soll dann angezeigt werden.
        <div className={`flex flex-col mt-5 h-4/5 items-center`}>

          <div
            className={`h-full w-full px-5 flex justify-evenly flex-col items-center border border-cyan-400 rounded-lg shadow-lg ${color}`}
          >

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
      )}
    </div>
  );
}

// const messageData = {
//   sender: userId,
//   content: "Hello, this is a message!",
//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
// };
