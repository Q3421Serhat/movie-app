import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../auth/firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';
export const AuthContext = createContext()



// export const useAuthContext =() => {
//     return useContext(AuthContext)
// }

const AuthContextProvider  = ({children}) => {
    const [currentUser, setcurrentUser] = useState(false)
    let navigate = useNavigate();

useEffect(() => {
  userObserver();

}, []);



const createUser = async(email, password, displayName) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        );
await updateProfile(auth.currentUser, {
    displayName,
});

        // console.log(userCredential); 
        navigate('/');
          toastSuccessNotify('Registered succesfully!')
      
    } catch (error) {
        toastErrorNotify(error.message);  
    }
};

const signIn = async(email, password) => {
    try {
       let userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
        );
        navigate('/');
        toastSuccessNotify('Logged in succesfully!')
       console.log(userCredential)
    } catch (error) {
      toastErrorNotify(error.message);  
    }
};
const logOut = () => {
    signOut(auth)
    toastSuccessNotify('Logged out succesfully!')
}

const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const {email, displayName, photoURL} = user
            setcurrentUser({email, displayName, photoURL})
            console.log(user);
        } else {
          // User is signed out
          setcurrentUser(false);
          console.log('logged out')
        }
    });
};

const signUpProvider = () => {
const provider = new GoogleAuthProvider(); 

signInWithPopup(auth, provider)
  .then((result) => {
   console.log(result);
   navigate('/');
  }).catch((error) => {
    // Handle Errors here.
    console.log(Error);
  });
};
 const values = {createUser, signIn, logOut, currentUser,signUpProvider};

  return (
  <AuthContext.Provider value={values}>
    {children} 
    </AuthContext.Provider>
  
)};

export default AuthContextProvider; 