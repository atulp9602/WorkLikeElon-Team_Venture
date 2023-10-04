import { axiosInstance } from "../config/http.config";

const changePassword = async (data) => {
  try {
    const response = await axiosInstance.patch("/users/changePassword", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { changePassword };
