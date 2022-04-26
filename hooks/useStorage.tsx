import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { firebaseInit } from "../firebase";

//
export default function useStorage(file: any) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const firestore = getFirestore(firebaseInit);

    useEffect(() => {
        const storageRef = ref(storage, file.file.name);
        console.log("me he ejecutado hook");
        const uploadTask = uploadBytesResumable(storageRef, file);

        //
        uploadTask.on('state_changed', (snapshot) => {
            // 
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log(snapshot.bytesTransferred, snapshot.totalBytes);

            console.log('Upload is ' + percentage + '% done');
            setProgress(percentage);

        },
            (error: any) => {
                //
                setError(error);
            },
            async () => {
                //
                await getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
                    setUrl(url);

                    //save the url in firestore
                    const docRef = doc(collection(firestore, "galleryImages"));;
                    setDoc(docRef, { url: url, name: file.file.name });

                });
            }
        );

    }, [file]);

    return { progress, url, error };
}

