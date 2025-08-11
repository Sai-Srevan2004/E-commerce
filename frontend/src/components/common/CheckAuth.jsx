
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

function CheckAuth({ isAuthenticated, user, authLoading, children }) {
  const location = useLocation();
  const path = location.pathname;
  const role = user?.role;

  const isAuthPage = path.startsWith("/auth");
  const isAdminPath = path.startsWith("/admin");
  const isProtectedShopPath = (
    path.startsWith("/shop/checkout") ||
    path.startsWith("/shop/account")
    // Add more protected shop paths if needed
  );

  const isShopPath = path.startsWith("/shop"); // <--- this covers all /shop/* paths

  if (authLoading) return <Loader />;

  // Admin routes protection
  if (isAdminPath) {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (role !== "admin") return <Navigate to="/unauth-page" />;
  }

  // Admin trying to access /shop/*
  if (isAuthenticated && role === "admin" && isShopPath) {
    return <Navigate to="/unauth-page" />;
  }

  // Protected shop routes (checkout, profile, etc.)
  if (isProtectedShopPath) {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (role === "admin") return <Navigate to="/unauth-page" />;
  }

  // Auth pages: if already logged in, redirect
  if (isAuthenticated && isAuthPage) {
    return role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  // Root redirect
  if (path === "/") {
    return <Navigate to="/shop/home" />;
  }

  // All other routes (including /shop/home) are public
  return <>{children}</>;
}

export default CheckAuth;

