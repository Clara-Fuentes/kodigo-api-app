import { useState } from 'react'
import './App.css'
import NavBar from "./components/NavBar"
import Footer from './components/Footer'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <div className='content'>
        <Card
        name="Curso React"
        description="Texto de ejemplo"
         technologies={["React", "Node.js", "CSS", "Firebase"]}
      />
      <Card
        name="Curso de Java"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
         technologies={["Java", "springboot", "MySQL", "Firebase"]}
      />
      </div>
      <Footer/>
    </>
  )
}

export default App
