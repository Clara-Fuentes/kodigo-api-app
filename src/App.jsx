import { useState } from 'react'
import './App.css'
import { LoginPage } from './views/loginPage/LoginPage'
import { AuthProvider } from './contexts/AuthProvider'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Kodigo-appi-app</h1>
      <AuthProvider>
          <LoginPage/>
      </AuthProvider>
    

    </>
  )
}

export default App
