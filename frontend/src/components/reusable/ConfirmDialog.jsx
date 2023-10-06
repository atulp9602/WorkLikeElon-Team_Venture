import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmDialog = ({
  isOpen,
  okLabel = "OK",
  cancelLabel = "Cancel",
  title = "Confirmation",
  proceed,
  enableEscape = true,
  bodyText,
}) => {
  return (
    <div className="static-modal">
      <Modal
        animation={false}
        show={isOpen}
        onHide={() => proceed(false)}
        backdrop={enableEscape ? true : "static"}
        keyboard={enableEscape}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => proceed(false)}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={() => proceed(true)}>
            {okLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmDialog;
