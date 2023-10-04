import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import "./authStyle.css";

import DynamicForm from "../../components/reusable/DynamicForm";
import { signupFormData } from "../../util/form/signup/data";
import { signupValidationSchema } from "../../util/form/signup/validation";
import { signup } from "../../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const handleSignup = useCallback(async (signupData) => {
    try {
      setIsResponseLoading(true);
      const response = await signup(signupData);
      toast.success(response?.data?.data?.message);
      navigate("/authentication/login");
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsResponseLoading(false);
    }
  }, []);

  const defaultValues = {
    name: "",
    userName: "",
    contactNo: "",
  };

  return (
    <div className="main">
      <div className="left">
        <img src={require("../../assets/todo_front.png")} />
      </div>
      <div className="right">
        <div className="appInfo">
          <img
            src={require("../../assets/todo_small_front.png")}
            alt="Todo App"
          />
        </div>
        <DynamicForm
          validationSchema={signupValidationSchema}
          formConfig={signupFormData}
          defaultValues={defaultValues}
          layout="vertical"
          onSubmit={handleSignup}
          className="auth-forms"
          isResponseLoading={isResponseLoading}
          buttonClass="btn btn-success"
          buttonLabel="Signup"
          suggestForLogin=<span className="m-1">
            If already have an account?{" "}
            <Link to="/authentication/login">Login</Link>
          </span>
        />
      </div>
    </div>
  );
};

export default Signup;
