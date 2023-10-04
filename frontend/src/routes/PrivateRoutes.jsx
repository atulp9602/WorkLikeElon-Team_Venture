import { lazy } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import Header from "../components/layout/Header";

const Home = lazy(() => import("../pages/todo"));
const Profile = lazy(() => import("../pages/user/profile"));
const ChangePassword = lazy(() => import("../pages/user/change-password"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/authentication/login" replace />;
  } else {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
};

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/dashboard/todo" />} />
        <Route path="/todo" element={<Home />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
