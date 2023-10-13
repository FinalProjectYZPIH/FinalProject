import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ThemeColors } from "./data"
import toast from "react-hot-toast"
import ToastProvider from "./ToastProvider"

const themeLength = ThemeColors.length



//Hier befinden sich alle globale daten die auf componente verteilt werden könnenn  siehe Beispiele bei HOme component und kommentiere es raus um auszuprobieren
export const useColorStore = create(
    persist(
        (set, get) => ({
            colorPosition : 0,
            color: "",
            setColorPosition: () => set((state) => {
                const nextColorPosition = (state.colorPosition + 1) % ThemeColors.length;
                return {
                    colorPosition: nextColorPosition,
                    color: ThemeColors[nextColorPosition], // Aktualisiere die Farbe
                };
            }),
            setSpecificColor: (index) => {
                if (index >= 0 && index < ThemeColors.length) {
                    set((state) => ({
                        colorPosition: index,
                        color: ThemeColors[index], // Aktualisiere die Farbe
                    }));
                }
            },
        }),
        {
            name: "ThemeColor", //name (unique) in der Speicherung
            partialize: (state) => ({ color: state.color, colors: state.colors}), // nur die werden gespeichert
            storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
        }
    )
) 

export const useDarkLightMode = create((set) => ({
    lightMode: true,
    setDarkMode: () => set((state) => ({lightMode: !state.lightMode}))
}))



// export const useToastConditions = create((set) => ({  
//     addToast: (message) => {toast(message)},
//     toast : () => set((state) =>  <ToastProvider>{{addToast: state.addToast}}</ToastProvider>)
// }))