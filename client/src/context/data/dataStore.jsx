import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ThemeColors } from "./data"


export const useColorStore = create(
    persist(
        (set, get) => ({
            colorPosition : 0,
            color: ThemeColors[get().colorPosition],
            setColorPostion: () => set({colorPosition: get().colorPosition +1 })
        }),
        {
            name: "ThemeColor", //name (unique) in der Speicherung
            storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
        }
    )
) 