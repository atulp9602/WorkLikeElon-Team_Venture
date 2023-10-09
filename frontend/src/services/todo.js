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

const filterLoggedUserTodos = async (data) => {
  try {
    const response = await axiosInstance.post("/todos/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateTodoSequence = async (todoId, data) => {
  try {
    const response = await axiosInstance.patch(
      `todos/updateOrder/${todoId}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchGroupWiseUserTodoList,
  filterLoggedUserTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoSequence,
};
