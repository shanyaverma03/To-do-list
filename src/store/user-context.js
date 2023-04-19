import React from "react"
const UserContext= React.createContext({
    isLoggedIn:false,
    setIsLoggedIn: ()=>{},
    authUser: null,
    setAuthUser:()=>{}
})

export default UserContext;