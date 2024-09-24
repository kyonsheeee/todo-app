import React, { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: "高" | "中" | "低";
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"高" | "中" | "低">("中");

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, dueDate, priority },
    ]);
    setInput("");
    setDueDate("");
    setPriority("中");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (
    id: number,
    newText: string,
    newDueDate: string,
    newPriority: "高" | "中" | "低"
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              dueDate: newDueDate,
              priority: newPriority,
            }
          : todo
      )
    );
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <input
        placeholder="TODOを追加"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: "8px" }}
      ></input>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: "8px" }}
      ></input>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "高" | "中" | "低")}
        style={{ marginRight: "8px" }}
      >
        <option value="高">高</option>
        <option value="中">中</option>
        <option value="低">低</option>
      </select>
      <button onClick={addTodo}>追加</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggle={toggleTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
