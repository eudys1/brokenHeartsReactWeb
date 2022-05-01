import { getFirestore, collection, onSnapshot, doc, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firebaseInit } from "../firebase";

//TODO: use try and catch
//TODO: check dependencies in useEffect
export const useFirestorage = (collectionName: string) => {

    const [docs, setDocs] = useState<Array<any>>([]);

    useEffect(() => {
        const firestore = getFirestore(firebaseInit);
        const collectionRef = collection(firestore, collectionName);

        const getCollectionData = onSnapshot(query(collectionRef), (querySnapshot) => {
            const documents: Array<any> = [];
            querySnapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });

            setDocs(documents);
        });

        return () => getCollectionData();

    }, []);


    return [docs]
}
