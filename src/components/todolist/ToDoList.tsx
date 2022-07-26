import styles from "./ToDoList.module.css";
import clipboard from "../../assets/clipboard.svg";
import { Trash } from "phosphor-react";
import { priorityColors } from "../../utils/filter";

import check from "../../assets/check.svg";
import { TodoFilter } from "../todoFilter/TodoFilter";
import { useEffect, useState } from "react";
import { useTodo } from "../../hooks/useTodo";

interface ToDoListProps {
  todosList: Array<{
    id: string;
    createdAt: Date;
    content: string;
    isDone: boolean;
    priority: number;
  }>;
  alterList: (id: string, doc: Object) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export function ToDoList({ todosList, alterList, deleteTodo }: ToDoListProps) {
  const todosDone = todosList?.reduce((acc, todo) => {
    if (todo.isDone === true) {
      acc += 1;
    }

    return acc;
  }, 0);
  const { filters } = useTodo()

  const onTodoIsDone = (id: string, todoIsDone: Object) => {
    alterList(id, todoIsDone)
  }

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.todoCreated}>
          <p>Tarefas criadas</p>
          <span>{todosList && todosList.length}</span>
        </div>
        <div className={styles.todoDone}>
          <p>Concluidas</p>
          <span>
            {todosList &&
              (todosDone > 0 ? `${todosDone} de ${todosList?.length}` : `0 de ${todosList?.length}`)}
          </span>
        </div>
      </header>
      <TodoFilter filters={filters} />
      <div className={styles.todolist}>
        {todosList && todosList?.length === 0 ? (
          <div className={styles.noTodos}>
            <img src={clipboard} alt="Clipboard image" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <ul className={styles.todos}>
            {todosList &&
              todosList.map((todo) => (
                <li key={todo.id} style={{background: `linear-gradient(${priorityColors[todo.priority - 1]} 0%, #262626 20px)`}}>
                  <div
                    className={`${styles.todoRadio} ${
                      todo.isDone ? styles.done : ""
                    }`}
                    onClick={() => onTodoIsDone(todo.id, { isDone: !todo.isDone })}
                  >
                    {todo.isDone && <img src={check}></img>}
                  </div>
                  <p className={todo.isDone ? styles.isDone : ""}>
                    {todo.content}
                  </p>
                  <div className={styles.priority}>
                    {priorityColors.map((priority, index) => (
                      <div
                        key={priority}
                        style={{ backgroundColor: `${priority}` }}
                        className={
                          index === todo.priority - 1 ? styles.active : ""
                        }
                        onClick={() =>
                          alterList(todo.id, { priority: index + 1 })
                        }
                      ></div>
                    ))}
                  </div>
                  <Trash size={20} onClick={() => deleteTodo(todo.id)} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
