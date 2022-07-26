import { FormEvent, useEffect, useState } from "react";
import { PlusCircle, CircleNotch } from "phosphor-react";
import { characterLimit, todosMaxLimit} from '../../utils/filter'

import styles from "./CreateToDo.module.css";
import { useFirestore } from "../../hooks/useFirestore";

interface CreateToDoProps {
  uid?: string;
  listLength?: number | null;
}

export function CreateToDo({ uid, listLength }: CreateToDoProps) {
  const [todo, setTodo] = useState("");
  const { addDocument, isPending, error: firestoreError, success } = useFirestore("todos");
  const [todoError, setTodoError] = useState<string | null>(null)

  const handleCreateTodo = async (e: FormEvent) => {
    e.preventDefault();

    if(todo.length == 0) {
      setTodoError(`A não tarefa pode estar vazia.`)
      return
    } else if(listLength) {
      if(listLength >= todosMaxLimit) {
        setTodoError(`Você não pode ter mais do que ${todosMaxLimit} tarefas a fazer, conclua ou exclua uma tarefa.`)
        return
      }
    }

    const doc = {
      uid,
      content: todo,
      isDone: false,
      priority: 1,
    };

    addDocument(doc);
  };

  useEffect(() => {
    if (success) {
      setTodo("");
    }
  }, [success]);

  useEffect(() => {
    if(todo.length >= characterLimit) {
      setTodoError(`Você pode criar uma tarefa com no maximo ${characterLimit} caracteres.`)
    } else if (firestoreError) {
      setTodoError(firestoreError)
    } else {
      setTodoError(null)
    }
  }, [todo, firestoreError])

  return (
    <div>
      <form className={styles.toDoBar} onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          maxLength={characterLimit}
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

        {firestoreError && <p className="error">{firestoreError}</p>}
      </form>
      {todoError && <span className="error" style={{paddingLeft: '0.5rem'}}>{todoError}</span>}
    </div>
  );
}
