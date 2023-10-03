import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./change-password.css";

import { useNavigate } from "react-router-dom";
import { changePasswordValidationSchema } from "../../../util/form/changePassword/validation";
import { changePasswordFormData } from "../../../util/form/changePassword/data";
import DynamicForm from "../../../components/reusable/DynamicForm";
import { changePassword } from "../../../services/user";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const handleChangePassword = async (data) => {
    try {
      setIsResponseLoading(true);
      const response = await changePassword(data);
      toast.success(response?.data?.data?.message);
      localStorage.clear();
      navigate("/authentication/login");
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsResponseLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <DynamicForm
        validationSchema={changePasswordValidationSchema}
        formConfig={changePasswordFormData}
        defaultValues={{
          password: "",
          newPassword: "",
        }}
        isResponseLoading={isResponseLoading}
        onSubmit={handleChangePassword}
        buttonClass="btn btn-warning"
      />
    </div>
  );
};

export default ChangePassword;
