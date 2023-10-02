import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("required !"),
  newPassword: Yup.string().required("required !"),
});
