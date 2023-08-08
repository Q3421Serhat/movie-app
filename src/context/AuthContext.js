import React, { createContext, useContext } from 'react'
import { auth } from '../auth/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
export const AuthContext = createContext()

// export const useAuthContext =() => {
//     return useContext(AuthContext)
// }

const AuthContextProvider  = ({children}) => {
const createUser = async(email, password) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        );
            console.log(userCredential); 
        
    } catch (error) {
        console.log(error.message);  
    }
};

const signIn = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.message)  
    }
}


 const values = {createUser, signIn};


  return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  
}

export default AuthContextProvider; 