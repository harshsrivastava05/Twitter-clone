import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import auth from "../firebase.init";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null); // Initialize with null to indicate loading
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            try {
                setUser(currentUser);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, loading, error, logIn, signUp, logOut, googleSignIn }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
