import React from "react";
import TodoList from "./components/TodoList";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p>TODOアプリ</p>
      <TodoList />
    </div>
  );
};

export default App;
