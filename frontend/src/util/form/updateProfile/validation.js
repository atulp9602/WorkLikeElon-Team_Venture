import * as Yup from "yup";

export const updateProfileValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required !"),

  contactno: Yup.string()
    .required("Required !")
    .matches(/^[789]\d{9}$/, "Invalid Mobile Number"),
});
