import styles from "./ToDoList.module.css";
import clipboard from "../../assets/clipboard.svg";
import { Trash } from "phosphor-react";

import check from '../../assets/check.svg'

interface ToDoListProps {
  todosList?: Array<{
    id: number;
    isDone: boolean;
    content: string
  }>
}

export function ToDoList({todosList}: ToDoListProps) {
  
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.todoCreated}>
          <p>Tarefas criadas</p>
          <span>0</span>
        </div>
        <div className={styles.todoDone}>
          <p>Concluidas</p>
          <span>0</span>
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
                  <div className={`${styles.todoRadio} ${todo.isDone ? styles.done : ''}`}>
                    {todo.isDone && (<img src={check}></img>)}
                  </div>
                  <p className={todo.isDone ? styles.isDone : ''} >{todo.content}</p>
                  <Trash size={20} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
