import { lazy } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Pomodoro from "../container/Promodoro";

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const CreatePassword = lazy(() => import("../pages/auth/CreatePassword"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const PublicRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard/todo" replace />
          ) : (
            <Navigate to="/authentication/signup" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/create-password/:token" element={<CreatePassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
