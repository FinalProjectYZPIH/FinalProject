import { createContext, useContext } from "react"
import io from "socket.io-client";

const SocketTheme = createContext(null)

export function useSocketProvider(){
  return useContext(SocketTheme)
}


export default function SocketProvider({children}) {
  
const socket = io.connect("http://localhost:3000");
  return (
    
    <SocketTheme.Provider value={socket}>
        {children}
    </SocketTheme.Provider>
  )
}
