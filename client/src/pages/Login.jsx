
import { FacebookIcons, GoogleIcons } from "../assets/Icons.jsx";
import { MediaButtons } from "../components/Buttons.jsx";
import { LoginComponent } from "../components/LoginComponent.jsx";



const Login = () => {

  return (
    <>
      <h1 className="text-4xl text-white-bold text-center mb-6 border-b-2 border-cyan-300">LOGIN</h1>
      
      {/* <MediaButtons>
        {" "}
        <GoogleIcons /> sign in with google
      </MediaButtons>
      <MediaButtons>
        <FacebookIcons /> sign in with facebook
      </MediaButtons> */}
      <LoginComponent />
    
    </>
  );
};


export default Login;


// beispiele 
// import { useState } from "react";
// import { useProfileStore } from "../context/data/dataStore.jsx";
// import { profileRequest, refreshRequest, loginRequest } from "../context/api/auth.jsx";
// export const Login = () => {
//   const { defaultProfile, setLogin, setLogout } = useProfileStore();

//   const mutation = loginRequest();
//   const refreshData = refreshRequest("refresh",{test: "hi"})
//   const userProfile = profileRequest("profile")

//   const {
//     data: userdata,
//     isLoading,
//     isSuccess,
//     error,
//     isError,
//   } = userProfile;

//   // const {isOnline } = defaultProfile;
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // const handleLogout = (e) => {
//   //   e.preventDefault();
//   //   console.log("Form data submitted:", formData);
//   //   setLogout()

//   // };

//   // const handleLogin = (e) => {
//   //   e.preventDefault()
//   //   setLogin()

//   // }

//   const handleRefresh = (e) => {
//     e.preventDefault()

//   }
//   const handleSumit = async (e) => {
//     e.preventDefault();
//     // setLoginData(() => ({ username: e.target[0].value, password: e.target[1].value}));  oder so schreiben
//     // mutation.mutate(formData)

//   };
//   return (
//     <>
//       <div>
//         <h2>Login</h2>
//         <form onSubmit={handleSumit}>
//           <div>
//             <label htmlFor="username">Benutzername:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Passwort:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           {/* <button className='border border-1 mx-2 p-1' type="submit" onClick={handleLogout}>logout</button>
//         <button className='border border-1 mx-2 p-1' type="submit" onClick={handleLogin}>login</button> */}
//         <button className='border border-1 mx-2 p-1' type="submit" onClick={(e) =>  handleRefresh(e)}>refreshTest</button>
//           <button className="border border-1 mx-2 p-1" type="submit">
//             submit
//           </button>
//         </form>
//       </div>
//       {/* {`${defaultProfile.isOnline}`} */}
//       {isLoading
//         ? "1loding........."
//         : isError
//         ? `2${error.response.data.message}`
//         : isSuccess
//         ? `3${userdata.data}`
//         : "Unknown Mistake........."}

{
  /* <LoginComponent /> */
}
//     </>
//   );
// };
