import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import "./authStyle.css";

import DynamicForm from "../../components/reusable/DynamicForm";
import { loginValidationSchema } from "../../util/form/login/validation";
import { loginFormData } from "../../util/form/login/data";
import { login } from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const handleLogin = useCallback(async (loginData) => {
    try {
      setIsResponseLoading(true);
      // const response = await postRequest("/auth/login", loginData);
      const response = await login(loginData);
      localStorage.setItem("token", response?.data?.data?.token);
      // toast.success(response?.data?.data?.message, { id: response?.status });
      navigate("/dashboard/todo");
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsResponseLoading(false);
    }
  }, []);

  return (
    <div className="main dir_reverse">
      <div className="left">
        <img src={require("../../assets/login_big_img.png")} alt="Login" />
      </div>
      <div className="right">
        <DynamicForm
          validationSchema={loginValidationSchema}
          formConfig={loginFormData}
          initialValues={{ userName: "klp@narola.email", password: "password" }}
          defaultValues={{
            userName: "",
            password: "",
          }}
          className="auth-forms"
          onSubmit={handleLogin}
          buttonLabel="Login"
          isResponseLoading={isResponseLoading}
          suggestForSignup=<span className="m-1">
            If Don't have an account?{" "}
            <Link to="/authentication/signup">signup</Link>
          </span>
          suggestForForgotPassword=<Link to="/authentication/forget-password">
            Forget Password
          </Link>
        />
      </div>
    </div>
  );
};

export default Login;
