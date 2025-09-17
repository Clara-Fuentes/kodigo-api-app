import { Routes, Route } from "react-router";
import Topbar from "./components/Topbar.jsx";
import BootcampsDashboard from "./views/dashboardPage/BootcampsDashboard.jsx";
import BootcampDetail from "./views/dashboardPage/BootcampDetail.jsx";

export default function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<BootcampsDashboard />} />
        <Route path="/bootcamps/:id" element={<BootcampDetail />} />
      </Routes>
    </>
  );
}
