import { Header } from "./components/header/Header"

import styles from './App.module.css'
import { CreateToDo } from "./components/createToDo/CreateToDo"
import { ToDoList } from "./components/todolist/ToDoList"

function App() {


  return (
    <div className="App">
      <Header />
      <main className={styles.container}>
        <CreateToDo />
        <ToDoList />
      </main>
    </div>
  )
}

export default App
