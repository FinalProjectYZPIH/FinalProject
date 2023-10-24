import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeColors } from "./data";
import { Navigate } from "react-router-dom";

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
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
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
      name: "DarkLightMode",
      storage: createJSONStorage(),
    }
  )
);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      role: null,
      profile: null,
      isOnline: false,
      setLogin: () => (state) => {
        Navigate({ to: "/" });
        set({ isOnline: (state.isOnline = true) });
      },
      setLogout: () => (state) => {
        Navigate({ to: "/login" });
        set({ isOnline: (state.isOnline = false) });
      },
    }),
    {
      name: "Auth",
      storage: createJSONStorage(),
    }
  )
);

export const useUserStore = create(
  persist(
    (set, get) => (
      {
        userId: "test",
        username: null,
        email: null,
        avatar: null,
        contacts: [
          {
            username: null,
            avatar: null,
          },
          // Weitere Freunde...
        ],
        notifications: {
          number: 0,
          notificationSound: "on",
        },
        messages: [
          { sender: "friend1_id", message: "Hi there!" },
          // Weitere Nachrichten...
        ],
        isOnline: true,
        settings: {
        },
      }),
    {
      name: "UserState",
      partialize: (state) => ({ color: state.color, colors: state.colors }),
      storage: createJSONStorage(),
    }

  )
);
