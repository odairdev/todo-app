import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export function useTodo() {
  const context = useContext(TodoContext)

  if(!context) {
    console.log('Context error: Check the provider.')
  }

  return context
}