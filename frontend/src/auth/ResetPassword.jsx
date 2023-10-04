import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./authStyle.css";

import DynamicForm from "../../components/reusable/DynamicForm";
import { resetPasswordValidationSchema } from "../../util/form/resetPassword/validation";
import { resetPasswordFormData } from "../../util/form/resetPassword/data";
import { resetPassword } from "../../services/auth";

const ResetPassword = () => {
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = useCallback(async (values) => {
    try {
      setIsResponseLoading(true);
      const response = await resetPassword(token, values);
      toast.success(response?.data?.message);
      navigate("/authentication/login");
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsResponseLoading(false);
    }
  }, []);

  return (
    <div className="main dir_reverse">
      <div className="left">
        <img
          src={require("../../assets/create_new_password.png")}
          alt="Reset Password"
        />
      </div>
      <div className="right">
        <DynamicForm
          validationSchema={resetPasswordValidationSchema}
          formConfig={resetPasswordFormData}
          defaultValues={{
            password: "",
          }}
          className="auth-forms"
          onSubmit={handleResetPassword}
          buttonClass="btn btn-warning"
          isResponseLoading={isResponseLoading}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 450,
            padding: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
