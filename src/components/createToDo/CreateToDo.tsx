import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./CreateToDo.module.css";

interface CreateToDoProps {
  createTodo: (newTodo: string) => void;
}

export function CreateToDo({createTodo}:CreateToDoProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleCreateTodo = (e: FormEvent) => {
    e.preventDefault()

    createTodo(newTodo)
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
