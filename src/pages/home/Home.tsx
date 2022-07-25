import { useState } from "react";
import { CreateToDo } from "../../components/createToDo/CreateToDo";
import { ToDoList } from "../../components/todolist/ToDoList";
import { useAuth } from "../../hooks/useAuth";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

import styles from "./Home.module.css";

export function Home() {
  const { user } = useAuth();
  const { documents, error } = useCollection(
    "todos",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );
  const { updateDocument, deleteDocument } = useFirestore("todos");

  return (
    <main className={styles.home}>
      {documents && (
        <CreateToDo uid={user?.uid} listLength={documents.length} />
      )}
      {documents && (
        <ToDoList
          todosList={documents}
          alterList={updateDocument}
          deleteTodo={deleteDocument}
        />
      )}
    </main>
  );
}
