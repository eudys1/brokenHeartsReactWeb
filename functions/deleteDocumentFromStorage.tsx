import {  ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";


export default async function deleteDocumentFromStorage(directoryName?: string, documentName?: string) {
    // const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `${directoryName}/${documentName}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
        // File deleted successfully
    }).catch((error) => {
        console.log(error);

    });
}