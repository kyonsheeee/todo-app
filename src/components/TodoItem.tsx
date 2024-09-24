import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    dueDate: string;
    priority: "高" | "中" | "低";
  };
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newText: string,
    newDueDate: string,
    newPriority: "高" | "中" | "低"
  ) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onEdit,
  onToggle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);
  const [newPriority, setNewPriority] = useState<"高" | "中" | "低">(
    todo.priority
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, newText, newDueDate, newPriority);
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: "8px" }}
      ></input>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginRight: "8px" }}
          ></input>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            style={{ marginRight: "8px" }}
          ></input>
          <select
            value={newPriority}
            onChange={(e) =>
              setNewPriority(e.target.value as "高" | "中" | "低")
            }
            style={{ marginRight: "8px" }}
          >
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
          <button onClick={handleSave} style={{ marginRight: "8px" }}>
            保存
          </button>
        </>
      ) : (
        <>
          <p
            style={{
              marginRight: "8px",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text} (期限: {todo.dueDate}) (優先度: {todo.priority})
          </p>
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
