import * as Yup from "yup";

export const todoUpdateFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required !"),
  description: Yup.string().required("Required !"),
  estimatedTime: Yup.number()
    .typeError("It must be a number !")
    .required("Required !")
    .min(1, "Must be at least 1 minute !")
    .positive("Must be a positive number !")
    .integer("Must be an integer representing minutes !"),
  status: Yup.string("It must be a number !").required("Required !"),
});
