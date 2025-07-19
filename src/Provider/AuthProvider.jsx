import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase_init';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password, fullName) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentail) => {
                const user = userCredentail.user;
                return updateProfile(user, {
                    displayName: fullName
                })
                    .then(() => userCredentail)
            })
            .finally(()=> setLoading(false))





    }

    const signIn = (email, password) => {

        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
          .finally(() => setLoading(false));
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
         .finally(() => setLoading(false));
    };


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }

    }, [])


    const userInfo = {
        user, loading, createUser, signIn, loading,logOut

    }
    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;