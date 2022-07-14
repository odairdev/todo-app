import styles from "./ToDoList.module.css";
import clipboard from "../../assets/clipboard.svg";

export function ToDoList() {
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
        <div className={styles.noTodos}>
          <img src={clipboard} alt="Clipboard image" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      </div>
    </div>
  );
}
