import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}>
      <h5 style={{ marginBottom: "20px", fontSize: "1.2rem" }}>Loading...</h5>
      <Spinner animation="border" role="status" variant="primary" />
    </div>
  );
};

export default LoadingPage;
