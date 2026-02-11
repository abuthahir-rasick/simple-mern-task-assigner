import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login'
import ProtectedRoutes from '../components/ProtectedRoutes'
import ManagerDashboard from './ManagerDashboard'
import EmployeeDashboard from './EmployeeDashboard'
import Profile from './Profile';

const Router = () => {
  return (
    
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/manager" element={
            <ProtectedRoutes userRole="manager">
                <ManagerDashboard/>
            </ProtectedRoutes>
        }/>
        <Route path="/employee" element={
            <ProtectedRoutes userRole="employee">
                <EmployeeDashboard/>
            </ProtectedRoutes>
        }/>
    </Routes>

  )
}

export default Router
