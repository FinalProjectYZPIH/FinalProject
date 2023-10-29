

export const ThemeColors = [
    "bg-red-200",
    "blue",
    "yellow",
    "green",
    //etc....
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

