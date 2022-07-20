import { useState } from "react";
import { CreateToDo } from "../../components/createToDo/CreateToDo";
import { ToDoList } from "../../components/todolist/ToDoList";
import { useAuth } from "../../hooks/useAuth";

import styles from './Home.module.css'

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

export function Home() {
  const { user } = useAuth()
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

  const deleteTodo = (id: number) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id))
  }

  return (
    <main className={styles.home}>
      <CreateToDo createTodo={create} uid={user?.uid} />
      <ToDoList
        todosList={todos}
        alterList={alterList}
        deleteTodo={deleteTodo}
      />
    </main>
  );
}
