// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router' 
import Topbar from './components/Topbar.jsx'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import BootcampsDashboard from './views/dashboardPage/BootcampsDashboard.jsx'
import BootcampDetail from './views/dashboardPage/BootcampDetail.jsx'

export default function App() {
  return (
   
    <BrowserRouter>
      <Topbar />
      <NavBar />
      <Routes>
        <Route path="/" element={<BootcampsDashboard />} />
        <Route path="/bootcamps/:id" element={<BootcampDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
