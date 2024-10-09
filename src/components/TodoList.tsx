import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: "high" | "mid" | "low";
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"high" | "mid" | "low">("mid");

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, dueDate, priority },
    ]);
    setInput("");
    setDueDate("");
    setPriority("mid");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (
    id: number,
    newText: string,
    newDueDate: string,
    newPriority: "high" | "mid" | "low"
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
        type="text"
        placeholder="TODOを追加"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: "8px", marginBottom: '10px' }}
      ></input>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: "8px" }}
      ></input>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "high" | "mid" | "low")}
        style={{ marginRight: "8px" }}
      >
        <option value="high">高</option>
        <option value="mid">中</option>
        <option value="low">低</option>
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
