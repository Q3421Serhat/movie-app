import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRouter = () => {
    const { currentUser } = useContext(AuthContext)
  return 
    currentUser ? <Outlet /> : <Navigate to= '/login' replace />
};

export default PrivateRouter