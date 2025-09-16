import { useState } from 'react'
import './App.css'
import NavBar from "./components/NavBar"
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <h1>Kodigo-appi-app</h1>
      <Footer/>
    </>
  )
}

export default App
