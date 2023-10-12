import AuthProvider from "../auth/AuthProvider"
import { Outlet } from "react-router-dom"



//Hier finden Sie alle Wrapper für die gesamte App.
export function ContextWrapper() {

    return <AuthProvider> 
        <Outlet />

    </AuthProvider>
}
