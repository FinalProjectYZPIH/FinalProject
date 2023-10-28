<<<<<<< HEAD
import React from 'react'

export default function ChatDashboard() {
  return (
    <div>ChatDashboard</div>
  )
}
=======
import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";

export default function ChatDashboard() {
  const { defaultProfile, setLogout } = useProfileStore();

  const { isOnline } = defaultProfile;

  const { data: userData, isSuccess } = profileRequest("user");

  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
  };

  return (
    <div className="flex items-center flex-col ">
      <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
        Anzeigebildschirm
      </div>

      {isOnline && isSuccess ? (
        <div>{`${userData.data.firstname}`}</div>
      ) : (
        "failed to fetching userdata"
      )}
      <button className="border border-1 p-1" onClick={handleLogout}>
        logout
      </button>
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
>>>>>>> 7add30f5cc00ce47417c2c38952ae1ce982a2f4d
