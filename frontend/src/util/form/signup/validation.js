import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required !"),
  userName: Yup.string()
    .required("Required !")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"),
  contactNo: Yup.string()
    .required("Required !")
    .matches(/^[789]\d{9}$/, "Invalid Mobile Number"),
});
