import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated, isCheckingAuth} = useAuthStore()
    if(isCheckingAuth){
        return(
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Checking authentication...</span>
        </div>
      </div>
    );
    }
  return isAuthenticated ? children :<Navigate to={"/signin"}></Navigate>
}
