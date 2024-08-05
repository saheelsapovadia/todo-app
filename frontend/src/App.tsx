
import { Route, Routes } from 'react-router-dom'
import TodoPage from './Containers/TodoPage'
import LoginPage from './Containers/LoginPage'
import SignupPage from './Containers/SignupPage'
import './App.scss'
import ProtectedRoute from './Containers/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
            } />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
