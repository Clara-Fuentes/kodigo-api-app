// 1. Se combinan TODAS las importaciones necesarias
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import HomePage from './views/homePage/HomePage';
import LoginPage from './views/LoginPage/LoginPage'; // Importamos LoginPage
import BootcampsDashboard from './views/DashboardPage/BootcampsDashboard';
import BootcampDetail from './views/DashboardPage/BootcampDetail';
import { AuthProvider } from './contexts/AuthProvider'; // Importamos el AuthProvider
import './App.css';

function App() {
  return (
    // 2. El AuthProvider envuelve a toda la aplicación
    <AuthProvider>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Ruta para el Login */}
          <Route path="/dashboard" element={<BootcampsDashboard />} />
          <Route path="/bootcamps/:id" element={<BootcampDetail />} />
          {/* Aquí irán las demás rutas, como /register */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;