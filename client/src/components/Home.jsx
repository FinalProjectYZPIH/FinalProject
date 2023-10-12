import { Outlet} from "react-router-dom";
import io from "socket.io-client" 
// import { useColorStore } from "../context/data/dataStore";


const socket = io.connect("http://localhost:3000")
export default function Home() {



  
  function sendMessage(event){
    event.preventDefault();
    socket.emit("message", {message: "hello"})
  }


  // const {color, setColorPosition} = useColorStore()
  return (
    <div className="">Home 
        <Outlet/>
        {/* {color} */}
        {/* <button onClick={() => setColorPosition()}></button> */}
        {/* Socket Io Testing */}


        <form action="">-
          <input type="text" placeholder="Write messages" />
          <button type="submit" onClick={sendMessage}>Send Message</button>
        </form>
    </div>
  )
}
