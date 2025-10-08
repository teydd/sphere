import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom'

export const RedirectRoute = ({children}) => {
    const {isAuthenticated,user} = useAuthStore()
    if(isAuthenticated && user?.isVerified){
        return <Navigate to={"/"}></Navigate>
    }
  return children
}
