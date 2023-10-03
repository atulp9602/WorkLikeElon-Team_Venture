import { Button, Modal } from "react-bootstrap";
import DynamicForm from "./DynamicForm";

const FormModal = ({
  isOpen,
  modalTitle,
  formConfig,
  formValidationSchema,
  formInitialValues,
  isResponseLoading,
  handleCloseModal,
  handleSubmit,
  buttonLabel = "Submit",
}) => {
  const handleModalForm = (values) => {
    handleSubmit(values);
    handleCloseModal();
  };

  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DynamicForm
          validationSchema={formValidationSchema}
          formConfig={formConfig}
          initialValues={formInitialValues}
          isResponseLoading={isResponseLoading}
          layout="vertical"
          onSubmit={handleModalForm}
          buttonClass="btn btn-primary"
          buttonLabel={buttonLabel}
          className="form"
        />
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
