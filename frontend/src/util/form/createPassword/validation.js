import * as Yup from "yup";

export const createPasswordValidationSchema = Yup.object().shape({
  newpassword: Yup.string().required("Required !"),
});
