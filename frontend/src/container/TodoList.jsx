import React from "react";

const TodoList = ({ userTodoList, renderSingleTodo }) => {
  return (
    <ul>
      {Array.isArray(userTodoList) && userTodoList.length > 0 ? (
        userTodoList
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((todo) => <li key={todo?._id}>{renderSingleTodo(todo)}</li>)
      ) : (
        <h4 className="text-center text-secondary my-auto">No Todos !!</h4>
      )}
    </ul>
  );
};

export default TodoList;
