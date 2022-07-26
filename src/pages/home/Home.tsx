import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { CreateToDo } from "../../components/createToDo/CreateToDo";
import { TodoFilter } from "../../components/todoFilter/TodoFilter";
import { ToDoList } from "../../components/todolist/ToDoList";
import { useAuth } from "../../hooks/useAuth";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useTodo } from "../../hooks/useTodo";

import styles from "./Home.module.css";

export function Home() {
  const { user } = useAuth();
  const { todos, error, updateDocument, deleteDocument } = useTodo();

  return (
      <main className={styles.home}>
        {!todos && <div className="loading"><CircleNotch size={72} /></div>}
        {todos && (
          <>
            <CreateToDo uid={user?.uid} listLength={todos.length} />
            <ToDoList
              todosList={todos}
              alterList={updateDocument}
              deleteTodo={deleteDocument}
            />
          </>
        )}
      </main>
  );
}
