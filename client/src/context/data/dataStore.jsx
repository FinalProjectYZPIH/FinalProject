import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {immer} from "zustand/middleware/immer"
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

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       role: null,
//       isOnline: false,
//       setLogin: () => set((state) => ({ isOnline: (state.isOnline = true) })),
//       setLogout: () => set((state) => ({ isOnline: (state.isOnline = false) })),
//     }),
//     {
//       name: "Auth",
//       partialize: (state) => ({ role: state.role, isOnline: state.isOnline }),
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const useProfileStore = create(
  persist(
    (set, get) => ({
       defaultProfile :{
        userId: null,
        role: null,
        isOnline: false,
        username: null,
        email: null,
        avatar: null,
        contacts: [
          // {
          //   username: null,
          //   avatar: null,
          // },
        ],
        notifications: {
          // number: 0,
          // notificationSound: "on",
        },
        messages: [
          // { sender: "friend1_id", message: "Hi there!" },
          // Weitere Nachrichten...
        ],
        settings: {},
      },
      setLogin: () => set((state) => ({ defaultProfile: {...state.defaultProfile, isOnline: true}  })),
      setLogout: () => set((state) => ({ defaultProfile: {...state.defaultProfile, isOnline:false} })),
      setProfile: ({userId, role, username, email, avatar = "", contacts = [], messages = [], notifications =[]}) => set((state) => ({
        defaultProfil: {...state.defaultProfile, 
        userId,
        role,
        username,
        email,
        avatar,
        contacts: [...contacts ],
        messages: [...messages],
        notifications: [...notifications]
        }
      })),
      resetProfile: () => set((state) => ({
        defaultProfile: {
          userId: null,
          role: null,
          isOnline: false,
          username: null,
          email: null,
          avatar: "",
          contacts: [],
          notifications: {
            number: 0,
            notificationSound: "on",
          },
          messages: [],
          settings: {},
        },
      }))
      
    }),
    {
      name: "savedState",
      partialize: (state) => ({
        userId: state.defaultProfile.userId,
        isOnline: state.defaultProfile.isOnline,
        notifications: state.defaultProfile.notifications,
        role: state.defaultProfile.role,
        username: state.defaultProfile.username,
        email: state.defaultProfile.email,
        avatar: state.defaultProfile.avatar,
      }),

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
