import React from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <p>{todo.text}</p>
    </>
  );
};

export default TodoItem;
