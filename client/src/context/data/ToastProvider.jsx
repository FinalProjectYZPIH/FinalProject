import {Toaster} from "react-hot-toast" 
// import toast from "react-hot-toast"
// <button onClick={() => toast("hello world")}>Toast Test</button>






export default function ToastProvider({children}) {
  return (
    <>
        <Toaster />

        {children}
    </>
  )
}
