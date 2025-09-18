import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../views/loginPage/LoginPage";
import HomePage from "../views/homePage/HomePage";
import DashboardPage from "../views/dashboardPage/DashboardPage";

/** Ruta protegida muy simple.
 *  Cambia la lógica si usas context o verificación de token/JWT.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Al entrar a "/", redirige al Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>Página no encontrada</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
