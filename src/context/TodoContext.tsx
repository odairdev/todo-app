import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "../hooks/useAuth";
import { CollectionState, useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";

interface FiltersInterface {
  new: boolean;
  old: boolean;
  isDone: boolean;
  priority: number;
}

interface TodoContextData {
  todos: CollectionState[] | null;
  error: string | null;
  filters: FiltersInterface;
  changeFilter: () => void;
  updateDocument: (id: string, doc: Object) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

interface TodoContextProviderProps {
  children: ReactNode;
}

const inititalState = {
  todos: null,
  error: null,
  filters: {
    new: true,
    old: false,
    isDone: false,
    priority: -1,
  },
};

export enum TodoActionKind {
  LOADED_DOCUMENTS = "LOADED_DOCUMENTS",
}

interface TodoState {
  todos: CollectionState[] | null;
  error: string | null;
  filters: FiltersInterface;
}

interface TodoAction {
  type: TodoActionKind;
  payload: CollectionState[] | null;
  errorPayload?: string | null;
  filterPayload?: FiltersInterface | null
}

const TodoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.LOADED_DOCUMENTS:
      return {...state, todos: action.payload}
    default:
      return state;
  }
};

export const TodoContext = createContext({} as TodoContextData);

export function TodoContextProvider({ children }: TodoContextProviderProps) {
  const [state, dispatch] = useReducer(TodoReducer, inititalState);
  const { user } = useAuth();
  const { documents, error } = useCollection(
    "todos",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );
  const { updateDocument, deleteDocument } = useFirestore("todos");

  const changeFilter = () => {};

  useEffect(() => {
    dispatch({type: TodoActionKind.LOADED_DOCUMENTS, payload: documents, errorPayload: error})
  }, [documents])

  console.log(state.todos)

  return (
    <TodoContext.Provider
      value={{ ...state, changeFilter, updateDocument, deleteDocument }}
    >
      {children}
    </TodoContext.Provider>
  );
}
