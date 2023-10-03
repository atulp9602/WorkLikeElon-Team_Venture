import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingResponsePage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "rgba(0,0,0, 0.1)",
        zIndex: 9999,
      }}>
      <h5 style={{ marginBottom: "20px", fontSize: "1.2rem" }}>Loading...</h5>
      <Spinner animation="border" role="status" variant="primary" />
    </div>
  );
};

export default LoadingResponsePage;
