

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;
  const role = user?.role;

  const isAuthPage = path.includes("/login") || path.includes("/register");
  const isAdminPath = path.includes("admin");
  const isShopPath = path.includes("shop");

  // Case 1: Landing page redirection
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Case 2: Unauthenticated trying to access protected pages
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  // Case 3: Authenticated trying to access login/register
  if (isAuthenticated && isAuthPage) {
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Case 4: Authenticated non-admin trying to access admin routes
  if (isAuthenticated && role !== "admin" && isAdminPath) {
    return <Navigate to="/unauth-page" />;
  }

  // Case 5: Authenticated admin trying to access shop routes
  if (isAuthenticated && role === "admin" && isShopPath) {
    return <Navigate to="/unauth-page" />;
  }

  // Allow access to the requested route
  return <>{children}</>;
}

export default CheckAuth;
