import styles from "./ToDoList.module.css";
import clipboard from "../../assets/clipboard.svg";
import { Trash } from "phosphor-react";

import check from '../../assets/check.svg'

interface ToDoListProps {
  todosList: Array<{
    id: number;
    isDone: boolean;
    content: string
  }>;
  alterList: (id: number, status: boolean) => void;
  deleteTodo: (id: number) => void;
}

export function ToDoList({todosList, alterList, deleteTodo}: ToDoListProps) {
  const todosDone = todosList?.reduce((acc, todo) => {
    if(todo.isDone === true) {
      acc += 1
    }

    return acc
  }, 0)
  
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.todoCreated}>
          <p>Tarefas criadas</p>
          <span>{todosList.length}</span>
        </div>
        <div className={styles.todoDone}>
          <p>Concluidas</p>
          <span>{todosDone > 0 ? `${todosDone} de ${todosList?.length}` : '0'}</span>
        </div>  
      </header>
      <div className={styles.todolist}>
        {todosList?.length === 0 ? (
          <div className={styles.noTodos}>
            <img src={clipboard} alt="Clipboard image" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <ul className={styles.todos}>
            {todosList &&
              todosList.map((todo) => (
                <li key={todo.id}>
                  <div className={`${styles.todoRadio} ${todo.isDone ? styles.done : ''}`} onClick={() => alterList(todo.id, !todo.isDone)}>
                    {todo.isDone && (<img src={check}></img>)}
                  </div>
                  <p className={todo.isDone ? styles.isDone : ''} >{todo.content}</p>
                  <Trash size={20} onClick={() => deleteTodo(todo.id)}/>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
