import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./authStyle.css";

import DynamicForm from "../../components/reusable/DynamicForm";
import { createPasswordValidationSchema } from "../../util/form/createPassword/validation";
import { createPasswordFormData } from "../../util/form/createPassword/data";
import { createPassword } from "../../services/auth";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const { token } = useParams();

  const handleCreatePassword = useCallback(async (values) => {
    try {
      setIsResponseLoading(true);
      const response = await createPassword(token, values);
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
          validationSchema={createPasswordValidationSchema}
          formConfig={createPasswordFormData}
          defaultValues={{
            newpassword: "",
          }}
          className="auth-forms"
          onSubmit={handleCreatePassword}
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

export default CreatePassword;
