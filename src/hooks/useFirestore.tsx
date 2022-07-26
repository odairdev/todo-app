import { useEffect, useReducer, useState } from "react";
import firebase from 'firebase/app'
import { firestore, timestamp } from "../firebase/config";
import { useTodo } from "./useTodo";
import { TodoActionKind } from "../context/TodoContext";

enum FirestoreActionKind {
  IS_PENDING = 'IS_PENDING',
  ERROR = 'ERROR',
  ADDED_DOCUMENT = 'ADDED_DOCUMENT',
  DELETED_DOCUMENT = 'DELETED_DOCUMENT'
}

type FirestoreStateType = {
  document: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null;
  error?: any;
  isPending: boolean;
  success: boolean;
}

type FirestoreActionType = {
  type: FirestoreActionKind;
  payload: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null;
}

const initialState = {
  document: null,
  error: null,
  isPending: false,
  success: false
}

const firestoreReducer = (state: FirestoreStateType, action: FirestoreActionType): FirestoreStateType => {
  switch(action.type) {
    case FirestoreActionKind.ADDED_DOCUMENT:
      return {document: action.payload, isPending: false, error: null, success: true}
    case FirestoreActionKind.DELETED_DOCUMENT:
      return {document: null, isPending: false, error: null, success: true}
    case FirestoreActionKind.IS_PENDING:
      return {...state, isPending: true}
    case FirestoreActionKind.ERROR:
      return {document: null, error: action.payload, isPending: false, success: false}
    default:
      return state
  }
}

export function useFirestore(collection: string) {
  const [isCancelled, setIsCancelled] = useState(false)
  const [state, dispatch] = useReducer(firestoreReducer, initialState)
  let ref = firestore.collection(collection)

  const addDocument = async (doc: Object) => {
    dispatch({type: FirestoreActionKind.IS_PENDING, payload: null})

    try {
      const createdAt = timestamp.fromDate(new Date())

      const addedDocument = await ref.add({...doc, createdAt})

      dispatch({type: FirestoreActionKind.ADDED_DOCUMENT, payload: addedDocument})

    } catch(err: any) {
      console.log(err)
      dispatch({type: FirestoreActionKind.ERROR, payload: err.message})
    }
  }

  const updateDocument = async (id: string, doc: Object) => {
    dispatch({type: FirestoreActionKind.IS_PENDING, payload: null})

    await ref.doc(id).update({...doc})

    dispatch({type: FirestoreActionKind.DELETED_DOCUMENT, payload: null})
  }

  const deleteDocument = async (id: string) => {
    dispatch({type: FirestoreActionKind.IS_PENDING, payload: null})

    await ref.doc(id).delete()

    dispatch({type: FirestoreActionKind.DELETED_DOCUMENT, payload: null})
  }

  useEffect(() => {
    return () => {setIsCancelled(true)}
  }, [])

  return {...state, addDocument, updateDocument, deleteDocument}
}