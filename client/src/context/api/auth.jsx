import axios from "../../libs/axiosProtected"


export async function registerRequest (data) {
    const {firstname, lastname, username, birthday, email, emailConfirmation, password, passwordConfirmation} = data;
    const registerHandler = await axios.post("/api/auth/createUser",{
        firstname, lastname, username, birthday, email, emailConfirmation, password, passwordConfirmation
    })

    if(!registerHandler.ok) {
        const errorResponse = await signUpResponse.json();
        const errorMessage = errorResponse.message || "Failed to create user.";
        throw new Error(errorMessage);
      }
}

export async function loginRequest ({user, password}){

    const loginHandler = axios.post("/api/auth/login", {
        user,
        password,
    });

    if(!loginHandler.ok) {
        const errorResponse = await loginHandler.json();
        const errorMessage = errorResponse.message || "Failed to login.";
        throw new Error(errorMessage);
    }
}


export async function refreshRequest (){

    const refreshHandler = axios.post("/api/auth/tokenRefresh");

    if(!refreshHandler.ok) {
        const errorResponse = await loginHandler.json();
        const errorMessage = errorResponse.message || "Failed to login.";
        throw new Error(errorMessage);
    }
}

