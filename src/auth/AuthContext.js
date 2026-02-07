import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  // 🔄 Validar sesión al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    apiRequest('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 🔐 Login normal
  const login = async ({ email, password }) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    localStorage.setItem('token', data.token)

    const me = await apiRequest('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })

    setUser(me.user)
  }

  // 🔐 Login desde verify
  const loginWithToken = async (token) => {
    localStorage.setItem('token', token)

    const me = await apiRequest('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setUser(me.user)
  }

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}