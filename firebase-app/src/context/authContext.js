import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
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
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }
    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookProvider);
    }
    const loginWithGitHub = () => {
        const githubProvider = new GithubAuthProvider();
        return signInWithPopup(auth, githubProvider);
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };
    

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <authContext.Provider value={{ signUp, login, user, logOut, loading, loginWithGoogle, loginWithFacebook, loginWithGitHub ,resetPassword }}>
            {children}
        </authContext.Provider>
    )
}