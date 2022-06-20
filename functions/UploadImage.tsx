import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { firebaseInit } from "../firebase";

//
export default function UploadImage(file: any) {

    const firestore = getFirestore(firebaseInit);
    const storageRef = ref(storage, `galleryImages/${file.name}`);

    try {
        uploadBytes(storageRef, file).then(
            async () => {

                await getDownloadURL(storageRef).then((url: any) => {

                    //save the url in firestore
                    const docRef = doc(collection(firestore, "galleryImages"));
                    setDoc(docRef, { url: url, name: file.name });

                });
            }
        );

    } catch (error) {
        console.log(error);
    }

}

