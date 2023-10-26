import { createContext, useContext,useState,useEffect } from "react"
import io from "socket.io-client";

const SocketTheme = createContext(null)

export function useSocketProvider(){
  return useContext(SocketTheme)
}


export default function SocketProvider({children}) {
    const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

// const socket = io.connect("http://localhost:3000");
  return (
    
    <SocketTheme.Provider value={{socket,setSocket}}>
        {children}
    </SocketTheme.Provider>
  )
}
