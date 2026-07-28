import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
//import Dashboard from "@/pages/Dashboard";
// import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Providers from "@/pages/provider/Providers";
import ProviderProfile from "@/pages/provider/ProviderProfile";
// import Tickets from "@/pages/Tickets";
import CreateProvider from "@/pages/provider/CreateProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EditProvider from "@/pages/provider/EditProvider";

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/providers" element={<Providers />} />
  <Route path="/providers/:id" element={<ProviderProfile />} />
  {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
  {/* <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} /> */}
  <Route
  path="/provider/create"
  element={
    <ProtectedRoute>
      <CreateProvider />
    </ProtectedRoute>
  }
/>
  <Route
    path="/provider/:id/edit"
    element={
      <ProtectedRoute>
        <EditProvider />
      </ProtectedRoute>
    }
  />
</Routes>
  );
}