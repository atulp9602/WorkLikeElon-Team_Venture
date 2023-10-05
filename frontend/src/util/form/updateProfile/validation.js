import * as Yup from "yup";

export const updateProfileValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required !"),
  email: Yup.string()
    .required("Required !")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email")
    .required("Required !"),
  contactno: Yup.string()
    .required("Required !")
    .matches(/^[789]\d{9}$/, "Invalid Mobile Number"),
});
