import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase.config";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);
    const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
    const logOut = () => signOut(auth);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <authContext.Provider value={{ signUp, login, user, logOut, loading }}>
            {children}
        </authContext.Provider>
    )
}