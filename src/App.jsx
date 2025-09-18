// App.jsx
import './App.css'
import { LoginPage } from './views/loginPage/LoginPage'
import { AuthProvider } from './contexts/AuthProvider'


export default function App() {
  return (
    <>
      <h1>Kodigo-appi-app</h1>
      <AuthProvider>
          <LoginPage/>
      </AuthProvider>
    

    </>
  )
}
