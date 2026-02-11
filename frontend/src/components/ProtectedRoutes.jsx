import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({children,userRole}) => {
    const {token,role}=useSelector(state=>state.auth);
    if(!token) return <Navigate to='/' />
    if(userRole && userRole!==role) return <Navigate to='/' />
    return children;
}

export default ProtectedRoutes