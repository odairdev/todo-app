import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export interface CollectionState {
  content: string;
  createdAt: Date;
  isDone: boolean;
  priority: number;
  uid: string;
  id: string;
}

export function useCollection(collection: string, _query: Array<string | undefined> | null, _orderby: Array<string> | null) {
  const [documents, setDocuments] = useState<Array<CollectionState> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const query = useRef(_query).current
  const orderBy = useRef(_orderby).current

  useEffect(() => {
    let ref= firestore.collection(collection) as any

    if(query) {
      ref = ref.where(...query)
    }

    if(orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot((snapshot: any) => {
      let results: any = []

      snapshot.docs.forEach((doc: any) => {
        results.push({...doc.data(), id: doc.id})
      })
      
      setDocuments(results)
      setError(null)
    }, (err: any) => {
      console.log(err)
      setError(err.message)
    })

    return () => unsubscribe()
  }, [collection])

  return {documents, error}
}