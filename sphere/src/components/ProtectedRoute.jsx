import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated, isCheckingAuth} = useAuthStore()
    if(isCheckingAuth){
        return
    }
  return isAuthenticated ? children :<Navigate to={"/signin"}></Navigate>
}
