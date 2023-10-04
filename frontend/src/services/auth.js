import { axiosInstance } from "../config/http.config";

const signup = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (data) => {
  try {
    const response = await axiosInstance.post("/signin", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const forgetPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/forgot-password", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const createPassword = async (token, data) => {
  try {
    const response = await axiosInstance.post(`/reset-password/${token}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token, data) => {
  try {
    const response = await axiosInstance.post(`/reset-password/${token}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { signup, login, forgetPassword, resetPassword, createPassword };
