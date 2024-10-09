import React, { useState } from "react";
import '../styles/TodoItem.css';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    dueDate: string;
    priority: "high" | "mid" | "low";
  };
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newText: string,
    newDueDate: string,
    newPriority: "high" | "mid" | "low"
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
  const [newPriority, setNewPriority] = useState<"high" | "mid" | "low">(
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
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
              setNewPriority(e.target.value as "high" | "mid" | "low")
            }
            style={{ marginRight: "8px" }}
          >
            <option value="high">高</option>
            <option value="mid">中</option>
            <option value="low">低</option>
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
            {todo.text} (期限: {todo.dueDate}) (優先度: {todo.priority === "high" ? "高" : todo.priority === "mid" ? "中" : "低"})
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
