import { Outlet } from "react-router-dom";
import io from "socket.io-client" 


const socket = io.connect("http://localhost:3000")
export default function Home() {



  function sendMessage(event){
    event.preventDefault();
    socket.emit("message", {message: "hello"})
  }
  return (
    <div>Home
        <Outlet/>
        {/* Socket Io Testing */}

        <form action="">-
          <input type="text" placeholder="Write messages" />
          <button type="submit" onClick={sendMessage}>Send Message</button>
        </form>
    </div>
  )
}
