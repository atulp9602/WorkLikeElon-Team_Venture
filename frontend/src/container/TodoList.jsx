import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { updateTodoSequence } from "../services/todo";

const TodoList = ({ userTodoList, renderSingleTodo }) => {
  const [todos, setTodos] = useState(userTodoList);

  useEffect(() => {
    setTodos(userTodoList);
  }, [userTodoList]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(destinationIndex, 0, draggedTodo);

    setTodos(updatedTodos);
    updateTodoSequence(
      updatedTodos.map((todo) => todo?._id),
      {
        sourceIndex,
        destinationIndex,
      }
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos" direction="vertical">
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#F3F4F6" : "white",
              padding: 8,
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo?._id} draggableId={todo?._id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging
                        ? "#E5E7EB"
                        : "white",
                      boxShadow: snapshot.isDragging
                        ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                        : "none",
                      marginBottom: 8,
                      borderRadius: 4,
                    }}
                  >
                    {renderSingleTodo(todo)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {todos.length === 0 && <p className="text-secondary">No Todos</p>}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
