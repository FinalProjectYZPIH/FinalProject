import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { ThemeColors } from "./data";
import { produce } from "immer";
// import { mergeDeepLeft } from "ramda";

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
    immer(
      produce((set, get) => ({
        defaultProfile: {
          userIdDB: null,
          userId: null,
          role: null,
          isOnline: false,
          username: null,
          email: null,
          avatar: null,
          notifications: 0, //[chatroom].reduce((startvalue,f) => startvalue + f.length   ,0)
          contacts: [
            // {socketId, username, Online},
            {
              socketId: "add",
              username: "Yan",
              Online: true,
              avatar:
                "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              notifications: 0,
            },
            {
              socketId: "add",
              username: "Pawel",
              Online: false,
              avatar: "",
              notifications: 0,
            },
            {
              socketId: "add",
              username: "Imad",
              Online: true,
              avatar: "",
              notifications: 0,
            },
            {
              socketId: "add",
              username: "Zoe",
              Online: true,
              avatar: "",
              notifications: 0,
            },
            {
              socketId: "add",
              username: "Berat",
              Online: true,
              avatar: "",
              notifications: 0,
            },
            {
              socketId: "add",
              username: "Quan",
              Online: false,
              avatar: "",
              notifications: 0,
            },
            //friends
          ],
          chatRooms: [
            // {
            //   type: "single",
            //   chatName: "",
            //   chatMessages: [
            //   ],
            //   participants: ["Yan", "Zoe"],
            //   comments: [],
            // },
            // {
            //   type: "group",
            //   chatName: "",
            //   chatAdmin: "Zoe",
            //   chatMessages: [
               
            //   ],
            //   participants: ["userid", "user2", "user3"],
            //   comments: [],
            // },
            //   {
            //   singleroom: {
            //     chatMessages: [{ content: "Guten Tag!", likes: 5, emojis: [] }],
            //     participants: ["Pawel", "Zoe"],
            //     comments: [{ content: "sample coments", likes: 5, emojis: [] }],
            //   },
            // },

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
          userIdDB,
          userId,
          role,
          username,
          email,
          avatar = "",
        }) =>
          set((state) => {
            state.defaultProfile.userIdDB = userIdDB;
            state.defaultProfile.userId = userId;
            state.defaultProfile.role = role;
            state.defaultProfile.username = username;
            state.defaultProfile.email = email;
            state.defaultProfile.avatar = avatar;
          }),
        resetProfile: () =>
          set((state) => {
            state.defaultProfile.userIdDB = null;
            state.defaultProfile.userId = null;
            state.defaultProfile.role = null;
            state.defaultProfile.username = null;
            state.defaultProfile.email = null;
            state.defaultProfile.avatar = null;
            // state.defaultProfile.contacts = [];
            // friends
            // (state.defaultProfile.notifications = 0), //[chatroom].reduce((startvalue,f) => startvalue + f.length   ,0)
            // (state.defaultProfile.chatRooms = null),
            // //[chatroom,...].filter(a => a[0] === friendsUserid)
            // (state.defaultProfile.settings = null);
          }),

        setChatRooms: (newChatRoom) =>
          set((state) => {
            return produce(state, (draftState) => {
              // Änderungen am draftState vornehmen
              // const newRoom = draftState.defaultProfile.chatRooms.find(
              //   (room) => room?.chatName === newChatRoom?.chatName
              // );
              // if (!newRoom ) {
              //   draftState.defaultProfile.chatRooms.push(newChatRoom);
              // }
              // Überprüfen, ob es ein Zimmer mit dem gleichen chatName gibt
              const existingRoomIndex =
                draftState.defaultProfile.chatRooms.findIndex(
                  (room) => room?.chatName === newChatRoom?.chatName
                );
              // Wenn ein Zimmer mit dem gleichen chatName gefunden wird, ersetze es durch newChatRoom
              if (existingRoomIndex !== -1) {
                draftState.defaultProfile.chatRooms[existingRoomIndex] =
                  newChatRoom;
              } else {
                // draftState.defaultProfile.chatRooms.push(newChatRoom);
                draftState.defaultProfile.chatRooms.push({
                  ...newChatRoom,
                  chatMessages: [], // Initialisiere chatMessages als leeres Array
                });
              }
            });
          }),
        setContacts: (contacts) =>
          set((state) => {
            state.defaultProfile.contacts.push(contacts);
          }),
        setConfigs: ({ configs }) =>
          set((state) => {
            state.defaultProfile.configs = [...configs];
          }),
        plusNotifications: () =>
          set((state) => {
            state.defaultProfile.notifications++;
          }),
        minusNotifications: () =>
          set((state) => {
            state.defaultProfile.notifications--;
          }),
      }))
    ),
    {
      name: "Profile",
      onRehydrateStorage: (state) => {
        console.log("Rehydration successful");
        return produce(state, (draftState) => {
          draftState.defaultProfile.chatRooms.forEach((room) => {
            if (room && room.chatMessages) {
              // Initialisiere chatMessages, wenn es nicht vorhanden ist
              room.chatMessages = room.chatMessages || [];
            }
          });
          // console.log("Draft State:", draftState);
          // return draftState
        });
      },
      // merge: (persistedState, currentState) => {
      //   mergeDeepLeft(persistedState, currentState)
      // },
      // onRehydrateStorage: (state) => {
      //   console.log("Rehydration successful");
      //   console.log(state)
      //   return state;
      // },
      
      // {
      //   console.log("hydration starts");
      //   const storedData = JSON.parse(sessionStorage.getItem("Profile"));
      //   // optional
      //   if (storedData && typeof storedData === "object") {
      //     // return deepRead(defaultProfile);

      //     console.log("hydration finished");
      //     return immer(() => state);
      //   } else {
      //     console.log("No valid data found in sessionStorage");
      //   }
      // },

      storage: createJSONStorage(() => {
        console.log("Persisting state to sessionStorage");
        return sessionStorage;
      }),
    }
  )
);

// Chatliste werden in Localstorage gepeichert messageLIste: [{ participants: [userId1, userId2]}, ...]  2 teilnehmer= direkter chat  >2 teinehmer = groupchat

// hier sind chatdaten für die speicherung im localstorage damit der chat effizienter läuft
// export const useChatStore = create(
//   persist(
//     immer((set, get) => ({
//       messageListe: [],
//       messageData: [],
//       setMessageList: (message) =>
//         set({ messageListe: get().messageListe.push(message) }),
//     }))
//   ),
//   {
//     name: "ChatStory",
//     onRehydrateStorage: (state) => {
//       console.log('hydration starts')

//       // optional
//       return ( error) => {
//         if (error) {
//           console.log('an error happened during hydration', error)
//         } else {
//           return immer(() => state)
//           console.log('hydration finished')
//         }
//       }
//     },
//     storage: createJSONStorage(() => localStorage),
//   }
// );

// hier sind chatdaten für die speicherung im localstorage damit der chat effizienter läuft
//export const useChatStore = create(
//  persist(
//    immer((set, get) => ({
//      messageListe: [], //messageLIste: [{ participants: [userId1, userId2]}, ...]
//      messageData: [], // ["string",....]

//    })),
//    immer({
//      name: "ChatStory",
//      storage: createJSONStorage(() => sessionStorage),
//    })
//  )
// );

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
