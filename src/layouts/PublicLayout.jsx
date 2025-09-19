import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PublicLayout() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="public-layout min-h-dvh flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
