import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { setAdminLoggedIn } from '../../components/admin/AdminProtectedRoute'

const ADMIN_EMAIL = 'ajay07@aveena.co.in'
const ADMIN_PASSWORD = 'ajay@aveena12345'

const AdminLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (submitting) return
    setSubmitting(true)

    // Hardcoded credentials check (frontend-only)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminLoggedIn()
      const redirectTo = location.state?.from || '/dashboard/admin'
      navigate(redirectTo, { replace: true })
    } else {
      setError('Invalid admin email or password.')
    }

    setSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter your admin credentials to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              placeholder="••••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 px-4 py-2.5 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin

