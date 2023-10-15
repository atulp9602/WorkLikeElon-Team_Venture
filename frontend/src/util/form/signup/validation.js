import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required !"),
  email: Yup.string()
    .required("Required !")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"),
  contactno: Yup.string()
    .required("Required !")
    .matches(/^[789]\d{9}$/, "Invalid Mobile Number"),
});
