// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import DashboardPage from "./pages/DashboardPage";
import BootcampsDashboard from "./pages/bootcamps/BootcampsDashboard";
import BootcampDetail from "./pages/bootcamps/BootcampDetail";
import { AuthContext } from "./contexts/AuthProvider";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  const hasToken = token || (typeof window !== "undefined" && localStorage.getItem("token"));
  return hasToken ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Protegido */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Bootcamps públicos (o protégelos si quieres) */}
        <Route path="/bootcamps" element={<BootcampsDashboard />} />
        <Route path="/bootcamps/:id" element={<BootcampDetail />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
