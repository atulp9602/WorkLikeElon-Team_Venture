import { axiosInstance } from "../config/http.config";

const fetchLoggedUserGroups = async () => {
  try {
    const response = await axiosInstance.get("/groups");
    return response;
  } catch (error) {
    throw error;
  }
};

const createGroup = async (data) => {
  try {
    const response = await axiosInstance.post("/groups/create", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchGroupAssociatedUsers = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/groups/userListAssigneeToGroup",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const updateGroup = async (groupId, data) => {
  try {
    const response = await axiosInstance.patch(`/groups/${groupId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (groupId) => {
  try {
    const response = await axiosInstance.delete(`/groups/${groupId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export { fetchLoggedUserGroups, createGroup, updateGroup, deleteGroup };
