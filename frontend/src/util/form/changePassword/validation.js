import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
  oldpassword: Yup.string().required("required !"),
  newpassword: Yup.string().required("required !"),
});
