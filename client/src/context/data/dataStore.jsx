import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ThemeColors } from "./data";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const themeLength = ThemeColors.length;

//Hier befinden sich alle globale daten die auf componente verteilt werden könnenn  siehe Beispiele bei Home component
export const useColorStore = create(
  persist(
    (set, get) => ({
      colorPosition: 0,
      color: "",
      setColorPosition: () =>
        set((state) => {
          const nextColorPosition = (state.colorPosition + 1) % themeLength;
          return {
            colorPosition: nextColorPosition,
            color: ThemeColors[nextColorPosition], // Aktualisiere die Farbe
          };
        }),
      setSpecificColor: (index) => {
        if (index >= 0 && index < themeLength) {
          set((state) => ({
            colorPosition: index,
            color: ThemeColors[index], // Aktualisiere die Farbe
          }));
        }
      },
    }),
    {
      name: "ThemeColor", //name (unique) in der Speicherung
      partialize: (state) => ({ color: state.color, colors: state.colors }), // nur die werden gespeichert
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useDarkLightMode = create(
  persist(
    (set, get) => ({
      lightMode: true,
      setDarkMode: () => set((state) => ({ lightMode: !state.lightMode })),
    }),
    {
      name: "DarkLighMode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useProfileStore = create(
  persist(
    immer((set, get) => ({
      defaultProfile: {
        userId: null,
        role: null,
        isOnline: false,
        username: null,
        email: null,
        avatar: null,
        contacts: [
          //friends
        ],
        notifications: 0, //[chatroom].reduce((startvalue,f) => startvalue + f.length   ,0)
        chatRooms: [
          //[chatroom,...].filter(a => a[0] === friendsUserid)
        ],
        settings: {},
      },
      setLogin: () =>
        set((state) => {
          state.defaultProfile.isOnline = true;
        }),
      setLogout: () =>
        set((state) => {

          state.defaultProfile.isOnline = false;
          window.location.reload();
        }),
      setProfile: ({
        userId,
        role,
        username,
        email,
        avatar = "",
        contacts = [],
        chatRooms = [],
        notifications = [],
      }) =>
        set((state) => {
          // ...state.defaultProfile,
          (state.defaultProfile.userId = userId),
            (state.defaultProfile.role = role),
            (state.defaultProfile.username = username),
            (state.defaultProfile.email = email),
            (state.defaultProfile.avatar = avatar),
            (state.defaultProfile.contacts = [...contacts]),
            (state.defaultProfile.chatRooms = [...chatRooms]),
            (state.defaultProfile.notifications = [...notifications]);
        }),
      resetProfile: () =>
        set((state) => ({
          defaultProfile: {
            userId: null,
            role: null,
            username: null,
            email: null,
            avatar: "",
            contacts: [],
            notifications: 0,
            // {
            //   number: 0,
            //   notificationSound: "on",
            // },
            chatRooms: [], //ChatRooms
            settings: {},
          },
        })),
    })),
    immer({
      name: "savedState",
      partialize: (state) => ({
        userId: state.defaultProfile.userId,
        isOnline: state.defaultProfile.isOnline,
        notifications: state.defaultProfile.notifications,
        role: state.defaultProfile.role,
        username: state.defaultProfile.username,
        email: state.defaultProfile.email,
        avatar: state.defaultProfile.avatar,
        chatRooms: state.defaultProfile.chatRooms,
        contacts: state.defaultProfile.chats
      }),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

// Chatliste werden in Localstorage gepeichert messageLIste: [{ participants: [userId1, userId2]}, ...]  2 teilnehmer= direkter chat  >2 teinehmer = groupchat

// hier sind chatdaten für die speicherung im localstorage damit der chat effizienter läuft 
export const useChatStore = create(
  persist(
    immer((set, get) => ({
      messageListe: [], //messageLIste: [{ participants: [userId1, userId2]}, ...]
      messageData: [], // ["string",....]

      


    })),
    immer({
      name: "ChatStory",
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

// daten vorstellungen
// const roomChatData = {
//   chatName: "",
//   isGroupChat: false,
//   chatMessages: [messageData,...], // Jedes mal wenn einen nachricht gesendet wird, wird einen chatMessages erstellt, und messagData wird reingepushed. paricipants sind required. Die anderen Optionenen sind für raumerstellungen wichtig ansonstens sind alle optional.
//   participants: [userId1, userId2], // Teilnehmer des Gruppenchats (bei 3 oder mehr leute admin required)
//   chatAdmin: userid,
// };

// messageData kann bei allen stelle angehängt werden also auch als attachdocument
// const messageData = {
//   sender: userId,
//   content: "Hello, this is a message!",
//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
// };
