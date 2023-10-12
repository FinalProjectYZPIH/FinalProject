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
            color: (state) =>  state.ThemeColors[state.colorPosition],
            setColorPosition: () => set((state) => ({
                colorPosition: (state.colorPosition+1) % themeLength,
            })),
            setSpecificColor: (index) => {    //hier kann man den Zahl des Farbarrays bestimmen 
                if(index >= 0 && index < themeLength){
                    set(() => ({colorPosition: index}))
                }
            }
        }),
        {
            name: "ThemeColor", //name (unique) in der Speicherung
            storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
        }
    )
) 

export const useDarkLightMode = create((set) => ({
    lightMode: true,
    setDarkMode: () => set((state) => ({lightMode: !state.lightMode}))
}))



export const useToastConditions = create((set) => ({
    addToast: (message) => {toast(message)},
    toast : () => set((state) =>  <ToastProvider>{{addToast: state.addToast}}</ToastProvider>)
}))