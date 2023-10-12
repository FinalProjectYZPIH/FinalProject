import { Outlet } from "react-router-dom";
import { useToastConditions } from "../../context/data/dataStore";


export default function RootLayout() {
  const {toast} = useToastConditions();
  return (
    <div>RootLayout
        {toast}
        <Outlet/>
    </div>
  )
}
