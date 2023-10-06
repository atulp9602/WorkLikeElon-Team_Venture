import * as Yup from "yup";

export const createTodoFormValidationSchema = Yup.object().shape({
  groupId: Yup.string().required("Required !"),
  title: Yup.string().required("Required !"),
  description: Yup.string().required("Required !"),
  assignDueDate: Yup.date("Invalid Date !").required("Required !"),
});
