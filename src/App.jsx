import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/homePage/HomePage.jsx';
// import LoginPage from './views/LoginPage/LoginPage'; 
// import RegisterPage from './views/RegisterPage/RegisterPage';
// import DashboardPage from './views/DashboardPage/DashboardPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/*Ruta para la HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Aquí irán las otras rutas. */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
