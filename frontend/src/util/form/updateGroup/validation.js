import * as Yup from "yup";

export const updateGroupFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required !"),
});
