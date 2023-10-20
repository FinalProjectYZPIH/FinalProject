import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeColors } from "./data";

const themeLength = ThemeColors.length;

//Hier befinden sich alle globale daten die auf componente verteilt werden könnenn  siehe Beispiele bei Home component
export const useColorStore = create(
  persist(
    (set, get) => ({
      colorPosition: 0,
      color: "",
      setColorPosition: () =>
        set((state) => {
          const nextColorPosition =
            (state.colorPosition + 1) % themeLength;
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
      name: "DarkLighMode",
      storage: createJSONStorage(),
    }
  )
);


// export const useAuthStore = create(
//     persist(
//         (set,get)=> ({
//             role: null,
//             profile:null,
//             isAuth:false,
//             errors:null,

//     }))
// )