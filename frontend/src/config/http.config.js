import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => localStorage.getItem("token");

const attachAuthToken = (config) => {
  const token = getAuthToken();
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${token}`;
  }
  return config;
};

const handleResponse = (response) => {
  if (response?.status === 201 || response?.status === 200) {
    return response;
  } else if (response?.status === 204) {
    return Promise.resolve(null);
  } else {
    const errorMessage = response?.data ?? "Something Went Wrong";
    return Promise.reject(errorMessage);
  }
};

const handleError = (error) => {
  let errorMessage = "Something Went Wrong !!";
  if (error.response) {
    errorMessage =
      error?.response?.data?.message ??
      error?.toString() ??
      "Something Went Wrong";
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/authentication/login");
    }
  } else {
    if (navigator.onLine) {
      errorMessage = "Server Not Responding !! Try Again after some time ";
    } else {
      errorMessage = "Please, Check Network Connection !!";
    }
  }
  return Promise.reject(errorMessage);
};

axiosInstance.interceptors.request.use(attachAuthToken, (error) => {
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use(handleResponse, handleError);
