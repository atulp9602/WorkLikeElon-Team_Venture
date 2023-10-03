import { axiosInstance } from "../config/http.config";

const signup = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const forgetPassword = async (data) => {
  try {
    const response = await axiosInstance.post("auth/forgetPassword", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const createPassword = async (token, data) => {
  try {
    const response = await axiosInstance.post(
      `auth/forgetPasswordChange/${token}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token, data) => {
  try {
    const response = await axiosInstance.post(
      `/auth/resetPassword/${token}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export { signup, login, forgetPassword, resetPassword, createPassword };
