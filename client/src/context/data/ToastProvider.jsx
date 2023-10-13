import { useState } from "react"
import { createContext, useContext } from "react"
import {Toaster} from "react-hot-toast" 

const ToastTheme = createContext(null)

export function useToastProvider(){
  return useContext(ToastTheme)
}



export default function ToastProvider({children}) {
  
  // const useToast = (content, status, config) => {
  //   return toast?.[status](content,config )
  // }
  
  
  return (
    
    <ToastTheme.Provider value={null}>

        <Toaster />
        
        {children}
    </ToastTheme.Provider>
  )
}
