import React, { useState, useEffect, ChangeEvent } from "react";
import './TodoT.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoT: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [todoText, setTodoText] = useState<string>("");

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
      };

    const handleAddTodo = (event: React.FormEvent) => {
      event.preventDefault();
      if (todoText.trim() === "") return;
  
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    };
  
    const handleToggleComplete = (id: number) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    const handleDeleteTodo = (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

  
    return (
      <div className="container">
        <h1>TodoApp</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todoText}
            onChange={handleInputChange}
            placeholder="Dodaj zadanie..."
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo">  
                <label className="custom-checkbox">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                    />
                    <span className="checkbox-btn"></span>
                    <span className="todo-text">{todo.text}</span>
                </label>

                <button onClick={() => handleDeleteTodo(todo.id)}>
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default TodoT;