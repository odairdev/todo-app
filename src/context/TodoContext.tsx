import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
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
  todos: CollectionState[] | null | undefined;
  error?: any | null;
  filters: FiltersInterface;
  changeFilter: () => void;
  changeIsDone: () => void;
  changePriority: (index: number) => void;
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
  FILTER_DATE = "FILTER_DATE",
  FILTER_ISDONE = "CHANGE_FILTER_IS_DONE",
  FILTER_PRIORITY = "FILTER_PRIORITY",
  ERROR = "ERROR",
}

interface TodoState {
  todos: CollectionState[] | null | undefined;
  error?: any | null;
  filters: FiltersInterface;
}

interface TodoAction {
  type: TodoActionKind;
  payload: CollectionState[] | null | undefined;
  filterPayload: FiltersInterface;
  errorPayload?: any | null;
}

const TodoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.LOADED_DOCUMENTS:
      return { ...state, todos: action.payload };
    case TodoActionKind.FILTER_DATE:
      return { ...state, filters: action.filterPayload};
    case TodoActionKind.FILTER_ISDONE:
      return { ...state, filters: action.filterPayload };
    case TodoActionKind.FILTER_PRIORITY:
      return { ...state, filters: action.filterPayload };
    case TodoActionKind.ERROR:
      return { ...state, error: action.errorPayload };
    default:
      return state;
  }
};

export const TodoContext = createContext({} as TodoContextData);

export function TodoContextProvider({ children }: TodoContextProviderProps) {
  const [state, dispatch] = useReducer(TodoReducer, inititalState);
  const { user } = useAuth();
  const { documents, error: collectionError } = useCollection(
    "todos",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );
  const { updateDocument, deleteDocument } = useFirestore("todos");

  const changeFilter = () => {
    try {
      dispatch({
        type: TodoActionKind.FILTER_DATE,
        filterPayload: {
          new: !state.filters.new,
          old: !state.filters.old,
          isDone: state.filters.isDone,
          priority: state.filters.priority,
        },
        payload: null,
      });
    } catch (err: any) {
      dispatch({
        type: TodoActionKind.ERROR,
        errorPayload: err.message,
        filterPayload: state.filters,
        payload: null,
      });
    }
  };

  const changeIsDone = () => {
    try {
      dispatch({
        type: TodoActionKind.FILTER_ISDONE,
        filterPayload: {
          new: state.filters.new,
          old: state.filters.old,
          isDone: state.filters.isDone ? false : true,
          priority: state.filters.priority,
        },
        payload: null,
      });
    } catch (err: any) {
      dispatch({
        type: TodoActionKind.ERROR,
        errorPayload: err.message,
        filterPayload: state.filters,
        payload: null,
      });
    }
  };

  const changePriority = (index: number) => {
    try {
      dispatch({
        type: TodoActionKind.FILTER_PRIORITY,
        filterPayload: {
          new: state.filters.new,
          old: state.filters.old,
          isDone: state.filters.isDone,
          priority: index,
        },
        payload: null,
      });
    } catch (err: any) {
      dispatch({
        type: TodoActionKind.ERROR,
        errorPayload: err.message,
        filterPayload: state.filters,
        payload: null,
      });
    }
  };

  const filterData = (documents: CollectionState[] | null) => {
    if (documents) {
      let filteredTodos = documents;

      if (state.filters.old) {
        //@ts-ignore
        filteredTodos = documents.sort((a, b) => {
          if(a.createdAt > b.createdAt) {
            return 1
          } else if(a.createdAt < b.createdAt) {
            return -1
          } else {
            return 0
          }
        })
      } else if(state.filters.new) {
        filteredTodos = documents.sort((a, b) => {
          if(a.createdAt > b.createdAt) {
            return -1
          } else if(a.createdAt < b.createdAt) {
            return 1
          } else {
            return 0
          }
        })
      }

      if(state.filters.isDone) {
        filteredTodos = filteredTodos.filter((todo) => todo.isDone === true);
      }

      if(state.filters.priority != -1) {
        filteredTodos = filteredTodos.filter((todo) => todo.priority === state.filters.priority + 1);
      }
       return filteredTodos
    } else {
      return documents
    }
  };

  //Load Todos
  useEffect(() => {
    try {
      dispatch({
        type: TodoActionKind.LOADED_DOCUMENTS,
        payload: filterData(documents),
        filterPayload: state.filters,
      });
    } catch (err: any) {
      dispatch({
        type: TodoActionKind.ERROR,
        errorPayload: collectionError,
        payload: null,
        filterPayload: state.filters,
      });
    }
  }, [documents, state.filters]);

  return (
    <TodoContext.Provider
      value={{
        ...state,
        changeFilter,
        changeIsDone,
        changePriority,
        updateDocument,
        deleteDocument,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
