import { FormEvent, useEffect, useState } from "react";
import { PlusCircle, CircleNotch } from "phosphor-react";

import styles from "./CreateToDo.module.css";
import { useFirestore } from "../../hooks/useFirestore";

interface CreateToDoProps {
  createTodo: (todo: string) => void;
  uid?: string;
}

export function CreateToDo({ createTodo, uid }: CreateToDoProps) {
  const [todo, setTodo] = useState("");
  const { addDocument, isPending, error, success, document } = useFirestore("todos");

  const handleCreateTodo = async (e: FormEvent) => {
    e.preventDefault();

    const doc = {
      uid,
      todo,
      priority: 1,
    };

    addDocument(doc);
  };

  useEffect(() => {
    if (success) {
      setTodo("");
    }
  }, [success]);

  return (
    <form className={styles.toDoBar} onSubmit={handleCreateTodo}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        required
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      {!isPending && (
        <button type="submit">
          Criar <PlusCircle size={20} />
        </button>
      )}

      {isPending && (
        <button type="submit" disabled className={styles.loading}>
          <CircleNotch size={24} />
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
}
