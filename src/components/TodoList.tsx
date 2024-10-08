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
  const [errors, setErrors] = useState<{ input: string; dueDate: string }>({
    input: "",
    dueDate: "",
  });

  const addTodo = () => {
    let inputError = "";
    let dueDateError = "";

    if (input.trim() === "") {
      inputError = "TODOを入力してください。";
    }

    if (dueDate.trim() === "") {
      dueDateError = "期限を入力してください。";
    }

    if (inputError || dueDateError) {
      setErrors({ input: inputError, dueDate: dueDateError });
      return;
    }

    const newTodos = [
      ...todos,
      { id: Date.now(), text: input, completed: false, dueDate, priority },
    ];
    setTodos(sortTodos(newTodos));
    setInput("");
    setDueDate("");
    setPriority("mid");
    setErrors({ input: "", dueDate: "" });
  };

  const deleteTodo = (id: number) => {
    setTodos(sortTodos(todos.filter((todo) => todo.id !== id)));
  };

  const editTodo = (
    id: number,
    newText: string,
    newDueDate: string,
    newPriority: "high" | "mid" | "low"
  ) => {
    setTodos(
      sortTodos(
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
      )
    );
  };

  const toggleTodo = (id: number) => {
    setTodos(
      sortTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  const sortTodos = (todos: Todo[]): Todo[] => {
    const sortedTodos = [...todos];
    // console.log(sortedTodos);
    sortedTodos.sort((a, b) => {
      const priorityOrder = { high: 1, mid: 2, low: 3 };
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff === 0) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return priorityDiff;
    });
    return sortedTodos;
  };

  return (
    <>
      <input
        type="text"
        placeholder="TODOを追加"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: "8px", marginBottom: "10px" }}
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
      {errors.input && (
        <p style={{ color: "red", fontSize: "12px" }}>{errors.input}</p>
      )}
      {errors.dueDate && (
        <p style={{ color: "red", fontSize: "12px" }}>{errors.dueDate}</p>
      )}
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
