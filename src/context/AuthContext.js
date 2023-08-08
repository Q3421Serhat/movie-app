import React, { useContext } from 'react'
import { auth } from '../auth/firebase'
export const AuthContext = createContext()

// export const useAuthContext =() => {
//     return useContext(AuthContext)
// }

const AuthContextProvider  = ({children}) => {
const createUser = async(email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)  
    } catch (error) {
        console.log(error)
        
    }
};
values={createUser}


  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  )
}

export default AuthContextProvider 