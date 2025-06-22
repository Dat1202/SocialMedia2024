import { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, collectionName));
    
    const isValid =
    condition &&
    condition.compareValue !== undefined &&
    condition.compareValue !== null &&
    !(typeof condition.compareValue === "string" && condition.compareValue.trim() === "");
  console.log(isValid);
  const q = isValid
    ? query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      )
    : query(collectionRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("SNAPSHOT SIZE:", snapshot.size);
      console.log(
        "DOCS:",
        snapshot.docs.map((doc) => doc.data())
      );

      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
