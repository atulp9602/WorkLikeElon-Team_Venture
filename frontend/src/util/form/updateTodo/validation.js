import * as Yup from "yup";

export const todoUpdateFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required !"),
  description: Yup.string().required("Required !"),
  assignDueDate: Yup.date().required("Required !"),
  status: Yup.string().required("Required !"),
});
