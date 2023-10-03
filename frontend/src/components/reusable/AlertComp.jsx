import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertComp = ({ variant, text }) => {
  return (
    <Alert key={variant} variant={variant}>
      {text}
    </Alert>
  );
};

export default AlertComp;
