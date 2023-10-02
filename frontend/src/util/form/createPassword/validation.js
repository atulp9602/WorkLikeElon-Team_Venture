import * as Yup from "yup";

export const createPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Required !"),
});
