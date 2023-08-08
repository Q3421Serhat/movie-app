import React, { createContext, useContext } from 'react'
import { auth } from '../auth/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';
export const AuthContext = createContext()



// export const useAuthContext =() => {
//     return useContext(AuthContext)
// }

const AuthContextProvider  = ({children}) => {
    let navigate = useNavigate();
const createUser = async(email, password) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        );
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
}


 const values = {createUser, signIn};


  return (
  <AuthContext.Provider value={values}>
    {children} 
    </AuthContext.Provider>
  
)};

export default AuthContextProvider; 