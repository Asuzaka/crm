import React from 'react'
import { AppRouter } from './AppRouter'
import { AuthProvider } from './context/AuthContext'
export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
