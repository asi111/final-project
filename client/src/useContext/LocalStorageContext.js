import { createContext, useContext, useState,useEffect } from "react";
import { authContext } from "./authContext";



export const localStorageContext = createContext()

export const LocalStorageProvide = (props)=>{
    const localStorageKey = "user"
    const [auth , setAuth] = useContext(authContext)
    const [localStorageState,setLocalStorageState] = useState(localStorageKey)
    localStorage.setItem(localStorageKey , JSON.stringify(auth))

    return (
        <localStorageContext.Provider value={[localStorageState,setLocalStorageState]}>
           {props.children}
        </localStorageContext.Provider>
    )
    
}