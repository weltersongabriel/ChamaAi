import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";

import Providers from "@/pages/provider/Providers";
import ProviderProfile from "@/pages/provider/ProviderProfile";
import CreateProvider from "@/pages/provider/CreateProvider";
import EditProvider from "@/pages/provider/EditProvider";
import Favorites from "@/pages/favorites/Favorites";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/providers"
        element={<Providers />}
      />

      <Route
        path="/providers/:id"
        element={<ProviderProfile />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Criar perfil profissional */}
      <Route
        path="/provider/create"
        element={
          <ProtectedRoute>
            <CreateProvider />
          </ProtectedRoute>
        }
      />

      {/* Editar perfil profissional */}
      <Route
        path="/provider/:id/edit"
        element={
          <ProtectedRoute>
            <EditProvider />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}