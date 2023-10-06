import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LoadingResponsePage from "../pages/LoadingResponsePage";

const TodosDND = ({
  allStatusTodosList,
  renderSingleTodo,
  handleUpdateTodosSequence,
  isUpdateTodoResponseLoading,
  groupId,
}) => {
  useEffect(() => {
    setTodos(allStatusTodosList);
  }, [allStatusTodosList]);

  console.log("selected group", groupId);

  const [todos, setTodos] = useState(allStatusTodosList);
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    const updatedTodos = { ...todos };

    const [draggedTodo] = updatedTodos[sourceStatus].splice(sourceIndex, 1);

    updatedTodos[destinationStatus].splice(destinationIndex, 0, draggedTodo);

    setTodos(updatedTodos);
    handleUpdateTodosSequence({
      groupId,
      todoId: updatedTodos[destinationStatus].map((todo) => todo?._id),
      status: destinationStatus,
    });
  };

  if (isUpdateTodoResponseLoading) {
    return <LoadingResponsePage />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          width: "100%",
          overflow: "auto",
          gap: "10px",
          padding: "10px 5px",
        }}>
        {Object.keys(todos).map((status, index) => (
          <div
            key={status}
            className="d-flex flex-column gap-1 p-1 w-100"
            style={{
              backgroundColor: "white",
              boxShadow: "-5px -2px 10px #E7E6E6",
            }}>
            <h5 className="fw-bold text-center text-primary my-0">
              {status.toLocaleUpperCase()}
            </h5>
            <Droppable key={status} droppableId={status} direction="vertical">
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`  ${
                    status === "todo"
                      ? "bg-primary-subtle"
                      : status === "in-progress"
                      ? "bg-warning-subtle"
                      : "bg-success-subtle"
                  } p-2 rounded`}>
                  {todos[status].map((todo, index) => (
                    <Draggable
                      key={todo?._id}
                      draggableId={todo?._id}
                      index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`shadow p-2 rounded border border-secondary-subtle ${
                            snapshot.isDragging
                              ? "bg-secondary-subtle"
                              : "bg-light"
                          }`}>
                          {renderSingleTodo(todo)}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TodosDND;
