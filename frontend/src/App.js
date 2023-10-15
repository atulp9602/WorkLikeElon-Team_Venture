import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { PublicRoutes, PrivateRoutes } from "./routes";
import { DragDropContext } from "react-beautiful-dnd";
import Pomodoro from "./container/Promodoro";

const LoadingPage = lazy(() => import("./pages/LoadingPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && location.pathname.startsWith("/authentication")) {
      window.location.replace("/dashboard/todo");
    }
  }, [token, location]);

  return (
    <DragDropContext>
      <div className="App">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<Navigate to="/authentication/login" />} />
            <Route path="/dashboard/*" element={<PrivateRoutes />} />
            <Route path="/authentication/*" element={<PublicRoutes />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
    </DragDropContext>
  );
}

export default App;
