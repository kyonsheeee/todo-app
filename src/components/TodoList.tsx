import React, { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <input
        placeholder="TODOを追加"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={addTodo}>追加</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
