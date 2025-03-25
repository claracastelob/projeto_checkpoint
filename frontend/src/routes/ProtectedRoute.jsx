import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza a rota filha
  return <Outlet />;
}