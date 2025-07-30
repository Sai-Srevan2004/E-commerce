import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthh } from "./slices/authSlice";

import CheckAuth from "./components/common/CheckAuth";
import ShopLayout from "./components/shop/ShopLayout";
import AuthLayout from "./components/auth/AuthLayout";

import HomePage from "./pages/shop/Home";
import Products from "./pages/shop/Products";
import Account from "./pages/shop/Account";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/common/NotFound";
import PaymentSuccessPage from "./pages/shop/PaymentSuccess";
import Checkout from "./pages/shop/Checkout";
import VerifyEmail from "./pages/auth/VerifyEmail";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminFeatures from "./pages/admin/Features";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import UnAuthPage from "./pages/auth/UnAuthPage";
const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, authLoading } = useSelector(
    (state) => state.auth
  );

  console.log(user,"oooooooooooooooooooooo")

  useEffect(() => {
    dispatch(checkAuthh());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              authLoading={authLoading}
            />
          }
        />

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              authLoading={authLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Shop Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              authLoading={authLoading}
            >
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="account" element={<Account />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} authLoading={authLoading}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage/>}/>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
