import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from './pages/layout/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RootLayout from './pages/layout/RootLayout';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import { AppWrapper} from './context/data/AppWrapper';


// function App() {

//   return (
//     <>
//       <div>Hello World</div>
//     </>
//   )
// }

// export default App

export const router  = createBrowserRouter(    //Template für React-router-dom
    createRoutesFromElements(
        <Route element={<AppWrapper />}>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/" element={<RootLayout />}>
                <Route element={<Home />}>
                    <Route index element={<Navigation />} />
                </Route>
            </Route>
        </Route>
    )
)

