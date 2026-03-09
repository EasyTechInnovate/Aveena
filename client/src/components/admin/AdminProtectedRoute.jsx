import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ADMIN_LOGIN_FLAG = 'isAdminLoggedIn'

export const setAdminLoggedIn = () => {
  localStorage.setItem(ADMIN_LOGIN_FLAG, 'true')
}

export const clearAdminLoggedIn = () => {
  localStorage.removeItem(ADMIN_LOGIN_FLAG)
}

export const isAdminLoggedIn = () => {
  return localStorage.getItem(ADMIN_LOGIN_FLAG) === 'true'
}

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation()

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin-login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default AdminProtectedRoute

