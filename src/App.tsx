import { Header } from "./components/header/Header";

import styles from "./App.module.css";
import { CreateToDo } from "./components/createToDo/CreateToDo";
import { ToDoList } from "./components/todolist/ToDoList";
import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    isDone: false,
    content: "Tenho que terminar o desafio do ignite.",
  },
  {
    id: 2,
    isDone: true,
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut dolorem molestiae cumque est, nobis eius amet culpa corporis expedita deleniti quod saepe officia eum vero, blanditiis, quos necessitatibus id corrupti!",
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const create = (newTodo: string) => {
    setTodos((prevState) => [
      ...prevState,
      {
        id: prevState[prevState.length - 1].id + 1,
        isDone: false,
        content: newTodo,
      },
    ]);
  };

  const alterList = (id: number, status: boolean) => {
    setTodos(prevState => prevState.filter(todo => {
      if(todo.id === id) {
        todo.isDone = status
        return todo
      } else {
        return todo
      }
    }))
  }

  return (
    <div className="App">
      <Header />
      <main className={styles.container}>
        <CreateToDo createTodo={create} />
        <ToDoList todosList={todos} alterList={alterList}/>
      </main>
    </div>
  );
}

export default App;
