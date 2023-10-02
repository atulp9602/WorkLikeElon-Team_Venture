import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ height: "calc(100vh - 56px)" }}
      className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <FaRegSadCry size={64} color="#d9534f" />
        <h3 className="my-3">Oops, Page Not Found!</h3>
        <p className="text-muted">
          The page you are looking for might have been removed or doesn't exist.
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
