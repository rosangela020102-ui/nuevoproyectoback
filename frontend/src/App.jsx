import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const user = { name: "Usuario Admin", role: "ADMIN" };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página Principal / Catálogo</h1>} />
        <Route element={<AdminRoute user={user} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}