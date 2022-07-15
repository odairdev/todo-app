import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./CreateToDo.module.css";

export function CreateToDo() {
  const [newTodo, setNewTodo] = useState("");

  const handleCreateTodo = (e: FormEvent) => {
    e.preventDefault()

    console.log(newTodo)
  }

  return (
    <form className={styles.toDoBar} onSubmit={handleCreateTodo}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button type="submit">
        Criar <PlusCircle size={20} />
      </button>
    </form>
  );
}
