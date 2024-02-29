import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

import { database } from "../FirebaseAuth/FirebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    // REGISTER A USER
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(database, email, password);
    }

    // LOG-IN
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(database, email, password);
    }

    // SIGN OUT
    const logOut = () => {
        return signOut(database);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(database, (currentUser) => {
            setUser(currentUser);
        })
        return () =>{
            unsubscribe();
        }
    },[]);

    return (
        <UserContext.Provider value={{ createUser, user, logOut, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}