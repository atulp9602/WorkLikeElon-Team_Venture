import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import "./authStyle.css";

import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/reusable/DynamicForm";
import { forgetPasswordValidationSchema } from "../../util/form/forgetPassword/validation";
import { forgetPasswordFormData } from "../../util/form/forgetPassword/data";
import { forgetPassword } from "../../services/auth";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const handleForgetPassword = useCallback(async (data) => {
    setIsResponseLoading(true);
    try {
      const response = await forgetPassword(data);
      toast.success(response?.data?.data?.message);
      navigate("/authentication/login");
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsResponseLoading(false);
    }
  }, []);

  return (
    <div className="main">
      <div className="left">
        <img
          src={require("../../assets/forgot_password.png")}
          alt="forget password"
        />
      </div>
      <div className="right">
        <DynamicForm
          validationSchema={forgetPasswordValidationSchema}
          formConfig={forgetPasswordFormData}
          defaultValues={{
            userName: "",
          }}
          isResponseLoading={isResponseLoading}
          onSubmit={handleForgetPassword}
          className="auth-forms"
          buttonClass="btn btn-warning"
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

export default ForgetPassword;
