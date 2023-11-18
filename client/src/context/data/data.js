

export const ThemeColors = [
  " border border-rose-600 text-rose-700",
  // " border border-red-500 text-red-900",
  " border border-green-500 text-green-900",
  " border border-cyan-400 text-cyan-800",
  " border border-yellow-400 text-yellow-800",
  " border border-fuchsia-400 text-fuchsia-800",
  "border border-pink-400 text-pink-600"
]



//auskommentierten sind optional

export const roomChatData = {
  //   chatName: "",
  //   isGroupChat: false,
  chatMessages: [/*messageData,...*/], // Jedes mal wenn einen nachricht gesendet wird, wird einen chatMessages erstellt, und messagData wird reingepushed. paricipants sind required. Die anderen Optionenen sind für raumerstellungen wichtig ansonstens sind alle optional.
  participants: [/*userId1, userId2*/], // Teilnehmer des Gruppenchats (bei 3 oder mehr leute admin required)
  //   chatAdmin: userid,
};

// messageData kann bei allen stelle angehängt werden also auch als attachdocument  template 
export const messageData = {
  //   sender: /*userId*/"", userId wird durch cookie ausgelesen oder man kann auch email/username benutzen
  content: "",
  //   likes: [], // Array von User-IDs, die den Beitrag mögen
  //   emojis: [], // Hier können Emojis hinzugefügt werden
  //   images: [], // Hier können Bild-URLs hinzugefügt werden
  //   voices: [], // Hier können Audio-URLs hinzugefügt werden
  //   videos: [], // Hier können Video-URLs hinzugefügt werden
}



export const fakePosts = [
  {
    id: 1,
    username: "john",
    fullname: "John Keller",
    userImg: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    postImg: "https://images.pexels.com/photos/9730025/pexels-photo-9730025.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: 2,
    username: "monica",
    fullname: "Monica Stan",
    userImg: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    postImg: "https://images.pexels.com/photos/3497624/pexels-photo-3497624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
];