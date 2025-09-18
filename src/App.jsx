
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar'; 
import HomePage from './views/homePage/HomePage.jsx'; // 
import BootcampsDashboard from './views/dashboardPage/BootcampsDashboard'; 
import BootcampDetail from './views/dashboardPage/BootcampDetail'; // 
import './App.css';

function App() { 

  return (
    <Router>
      <Topbar />
      <Routes>
        {/* Ruta para la HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Las rutas del compañero para el Dashboard */}
        <Route path="/dashboard" element={<BootcampsDashboard />} />
        <Route path="/bootcamps/:id" element={<BootcampDetail />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>

    </Router>
  );
}

export default App;