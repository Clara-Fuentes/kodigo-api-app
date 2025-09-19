// src/routes/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";

import HomePage from "../views/homePage/HomePage";
import LoginPage from "../views/loginPage/LoginPage";
import DashboardPage from "../views/dashboardPage/DashboardPage";

// 👇 IMPORTA ESTAS DOS VISTAS (ajusta la ruta y el case EXACTO)
import BootcampsDashboard from "../views/bootcamps/BootcampsDashboard.jsx";
import BootcampDetail from "../views/bootcamps/BootcampDetail.jsx";

const useHasToken = () => {
  const { token } = useContext(AuthContext);
  const persisted = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return Boolean(token || persisted);
};

const PrivateRoute = ({ children }) => (useHasToken() ? children : <Navigate to="/login" replace />);
const GuestRoute   = ({ children }) => (useHasToken() ? <Navigate to="/home" replace /> : children);

export default function AppRoutes() {
  const logged = useHasToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={logged ? "/home" : "/login"} replace />} />

        {/* Público (sin navbar) */}
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
        </Route>

        {/* Privado (con navbar) */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bootcamps" element={<BootcampsDashboard />} />
          <Route path="/bootcamps/:id" element={<BootcampDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
