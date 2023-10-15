import { createContext, useContext } from "react"
import {Toaster} from "react-hot-toast" 

const ToastTheme = createContext(null)

export function useToastProvider(){
  return useContext(ToastTheme)
}



export default function ToastProvider({children}) {
  

  return (
    
    <ToastTheme.Provider value={null}>

        <Toaster />
        
        {children}
    </ToastTheme.Provider>
  )
}
