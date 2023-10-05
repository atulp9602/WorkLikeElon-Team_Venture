import { axiosInstance } from "../config/http.config";

const fetchLoggedUserDetail = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    return response;
  } catch (error) {
    throw error;
  }
};

const updateUserDetail = async (data) => {
  try {
    const response = await axiosInstance.patch(`/update-profile`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (data) => {
  try {
    const response = await axiosInstance.patch("/change-password", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { changePassword, fetchLoggedUserDetail, updateUserDetail };
