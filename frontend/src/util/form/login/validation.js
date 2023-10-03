import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Required !")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"),
  password: Yup.string().required("required !"),
});
