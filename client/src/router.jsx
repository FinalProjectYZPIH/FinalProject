import './index.css'

function App() {

  return (
    <>
      <div>Hello World</div>
    </>
  )
}

export default App

// Hallo 
// import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
// import AuthProvider from "./context/auth/AuthProvider";
// import RootLayout from "./pages/layouts/RootLayout";
// import AuthLayout from "./pages/layouts/AuthLayout";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Navigation from "./pages/navi/Navigation";
// import Home from "./pages/Home";




// export const router  = createBrowserRouter(    Template für React-router-dom
//     createRoutesFromElements(
//         <Route element={<ContextWrapper />}>
//             <Route element={<AuthLayout />}>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//             </Route>
//             <Route path="/" element={<RootLayout />}>
//                 <Route element={<Home />}>
//                     <Route index element={<Navigation />} />
//                 </Route>
//             </Route>
//         </Route>
//     )
// )

// export function ContextWrapper() {
//     return <AuthProvider> 
//       {/* Hier kann man Notifikation oder anderen Provider wrappen */}
//         <Outlet />

//     </AuthProvider>
// }