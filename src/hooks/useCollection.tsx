import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import firebase from 'firebase/app'


export function useCollection(collection: string) {
  const [documents, setDocuments] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ref = firestore.collection(collection)

    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results: any = []

      snapshot.docs.forEach(doc => {
        results.push({...doc.data, id: doc.id})
      })
      
      setDocuments(results)
      setError(null)
    }, err => {
      console.log(err)
      setError(err.message)
    })

    return () => unsubscribe()
  }, [collection])

  return {documents, error}
}