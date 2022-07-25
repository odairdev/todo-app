import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";
import firebase from 'firebase/app'

export function useCollection(collection: string, _query: Array<string | undefined> | null, _orderby: Array<string> | null) {
  const [documents, setDocuments] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const query = useRef(_query).current
  const orderBy = useRef(_orderby).current

  useEffect(() => {
    let ref= firestore.collection(collection) as any

    if(query) {
      ref = ref.where(...query)
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