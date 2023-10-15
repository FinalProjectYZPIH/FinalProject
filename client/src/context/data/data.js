



export const UserNav = [   // grobe Datentypen
    {friends: []},
    {notification: 0},
    {message: 0},
    {isOnline: false},
    {avatar: "Image" && false},
    {config: "path"},
]

export const PageNav = [
    { path:     "/",         name: "Home",           isMember: false  },
    { path:     "/about",    name: "About",          isMember: false  },
    { path:     "/login",    name: "Login",          isMember: false },
    { path:     "/logout",    name: "Logout",        isMember: true },
    { path:     "/chat",     name: "Chat",           isMember: true },
    { path:     "/account",  name: "Account",        isMember: true },
]

export const ThemeColors = [
    "bg-red-200",
    "blue",
    "yellow",
    "green",
    //etc....
]