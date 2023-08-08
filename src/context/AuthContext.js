import React, { createContext, useContext } from 'react'
import { auth } from '../auth/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
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
        navigate('/');
            console.log(userCredential); 
      
    } catch (error) {
        console.log(error.message);  
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
       console.log(userCredential)
    } catch (error) {
      console.log(error.message)  
    }
}


 const values = {createUser, signIn};


  return (
  <AuthContext.Provider value={values}>
    {children} 
    </AuthContext.Provider>
  
)};

export default AuthContextProvider; 