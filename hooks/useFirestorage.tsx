import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firebaseInit } from "../firebase";

export const useFirestorage = (collectionName: any) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const firestore = getFirestore(firebaseInit);
        const collectionRef = collection(firestore, "galleryImages");

        // const unsub2 = onSnapshot( doc(collection(firestore, "galleryImages")), (snapshot:any) => {
        //     let document:Array<any> = [];

        //     snapshot.forEach((doc: any) => {
        //         document.push({ ...doc.data(), id: doc.id });
        //     });
        //     setDocs(document);
        // });


        // const unsub = collectionRef.onSnapshot((snapshot: any) => {
        //     let document = [];

        //     snapshot.forEach((doc: any) => {
        //         document.push({ ...doc.data(), id: doc.id });
        //     });

        // });

        // return () => unsub();
        
    }, [collectionName]);


    return { docs }
}
