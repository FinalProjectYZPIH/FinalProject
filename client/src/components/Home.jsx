import { Outlet} from "react-router-dom";
import io from "socket.io-client" 
import { useColorStore, useDarkLightMode, useToastConditions } from "../context/data/dataStore";
import {ThemeColors} from "../context/data/data"
import toast from "react-hot-toast/headless"


const socket = io.connect("http://localhost:3000")
export default function Home() {



  
  function sendMessage(event){
    event.preventDefault();
    socket.emit("message", {message: "hello"})
  }

  const {colorPosition, setColorPosition, setSpecificColor} = useColorStore() 

  const {addToast} = useToastConditions();

  // const {lightMode, setDarkMode } = useDarkLightMode() DarkLightMode Test
  return (
    <div className="">Home  
        <Outlet/>
        {console.log(colorPosition)} {ThemeColors[colorPosition]}
        {colorPosition}
        <button onClick={() => setColorPosition()}>Click</button>   
        <button onClick={() => setSpecificColor(0)}>Click mich auch</button>

        <button onClick={() => addToast("Hello World")} className="bg-green-400">Toast Test</button>
        


        {/* {lightMode ? "Light" : "Dark"}
        <button onClick={setDarkMode}>SwitchLight</button> Darklightmode Test */}

        {/* <p className="bg-black text-white w-full h-4">{color} </p> */}
        {/* Socket Io Testing */}


        <form action="">-
          <input type="text" placeholder="Write messages" />
          <button type="submit" onClick={sendMessage}>Send Message</button>
        </form>
    </div>
  )
}
