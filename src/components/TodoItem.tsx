import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
  };
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginRight: "8px" }}
          ></input>
          <button onClick={handleSave} style={{ marginRight: "8px" }}>
            保存
          </button>
        </>
      ) : (
        <>
          <p style={{ marginRight: "8px" }}>{todo.text}</p>
          <button onClick={handleEdit} style={{ marginRight: "8px" }}>
            編集
          </button>
          <button onClick={() => onDelete(todo.id)}>削除</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
