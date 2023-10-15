import * as Yup from "yup";

export const forgetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email")
    .required("Required !"),
});
