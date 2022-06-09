import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { firebaseInit } from "../firebase";

//
export default function UploadImage(file: any) {

    console.log(file);

    // const [error, setError] = useState(null);
    // const [url, setUrl] = useState(null);
    // const [progress, setProgress] = useState(0);

    const firestore = getFirestore(firebaseInit);
    const storageRef = ref(storage, `galleryImages/${file.name}`);

    try {
        uploadBytes(storageRef, file).then(
            async () => {

                console.log("url image done");
                await getDownloadURL(storageRef).then((url: any) => {
                    // setUrl(url);

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

