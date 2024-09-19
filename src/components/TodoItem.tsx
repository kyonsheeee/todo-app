import React from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
  };
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: '8px' }}>
      <>
        <p>{todo.text}</p>
        <button onClick={() => onDelete(todo.id)}>削除</button>
      </>
    </div>
  );
};

export default TodoItem;
