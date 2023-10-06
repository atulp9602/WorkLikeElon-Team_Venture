import React from "react";

const TodoList = ({ userTodoList, renderSingleTodo }) => {
  return (
    <ul>
      {Array.isArray(userTodoList) && userTodoList.length > 0 ? (
        userTodoList
          .sort((a, b) => new Date(b.assignDueDate) - new Date(a.assignDueDate))
          .map((todo) => (
            <li
              key={todo?._id}
              className={` ${
                new Date(todo?.assignDueDate).getTime() === new Date().getTime()
                  ? "bg-danger-subtle"
                  : "bg-light"
              }`}>
              {renderSingleTodo(todo)}
            </li>
          ))
      ) : (
        <h4 className="text-center text-secondary">No Todos !!</h4>
      )}
    </ul>
  );
};

export default TodoList;
