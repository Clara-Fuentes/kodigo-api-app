import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar"; // ⇐ coincide con el archivo (B mayúscula)

export default function AppLayout() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="app-layout min-h-dvh flex flex-col">
      <NavBar />
      <main className="app-content flex-1">
        <Outlet />
      </main>
    </div>
  );
}
