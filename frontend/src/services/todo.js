import { axiosInstance } from "../config/http.config";

const fetchGroupWiseUserTodoList = async (groupId, signal) => {
  try {
    const response = await axiosInstance.get(`/groups/${groupId}`, {
      signal,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchCurrentDateLoggedUserGroupWiseTodos = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/todos/groupWiseCurrentDateData",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const createTodo = async (data) => {
  try {
    const response = await axiosInstance.post("/todos/create", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (todoId, data) => {
  try {
    const response = await axiosInstance.patch(`/todos/${todoId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (todoId) => {
  try {
    const response = await axiosInstance.delete(`/todos/${todoId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchStatusWiseTodos = async (data) => {
  try {
    const response = await axiosInstance.post("/todos/statusWiseTodo", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchCurrentDateLoggedUserAllGroupsTodos = async () => {
  try {
    const response = await axiosInstance.post("/todos/currentDateData");
    return response;
  } catch (error) {
    throw error;
  }
};

const updateTodoSequence = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/todos/todoSequenceChange",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchGroupWiseUserTodoList,
  fetchCurrentDateLoggedUserAllGroupsTodos,
  fetchCurrentDateLoggedUserGroupWiseTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  fetchStatusWiseTodos,
  updateTodoSequence,
};
