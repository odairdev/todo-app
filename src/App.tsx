import { Header } from "./components/header/Header"

import styles from './App.module.css'
import { CreateToDo } from "./components/createToDo/CreateToDo"
import { ToDoList } from "./components/todolist/ToDoList"

const todos = [
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


  return (
    <div className="App">
      <Header />
      <main className={styles.container}>
        <CreateToDo />
        <ToDoList todosList={todos} />
      </main>
    </div>
  )
}

export default App
