import { Button, Modal } from "react-bootstrap";

const DetailModal = ({
  isOpen,
  handleCloseModal,
  modalTitle,
  children,
  loading,
}) => {
  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <h6 className="m-1 text-secondary">Loading...</h6>
        ) : (
          children
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
