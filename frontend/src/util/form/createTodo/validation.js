import * as Yup from "yup";

export const createTodoFormValidationSchema = Yup.object().shape({
  groupId: Yup.string().required("Required !"),
  title: Yup.string().required("Required !"),
  description: Yup.string().required("Required !"),
  estimatedTime: Yup.number()
    .typeError("It must be a number !")
    .min(1, "Must be at least 1 minute !")
    .positive("Must be a positive number !")
    .integer("Must be an integer representing minutes !"),
});
