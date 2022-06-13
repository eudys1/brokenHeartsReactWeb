import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query } from "firebase/firestore";
import { firebaseInit } from "../firebase";

//TODO: use try and catch
//TODO: check dependencies in useEffect
export const useSetShopingCart = (collectionName: string) => {

    const [shopingCart, _setShopingCart] = useState<any[]>([]);

    const setShopingCart = (shopingCart: any) => {
 
        shopingCart.forEach((product: any) => {
            _setShopingCart(shopingCart);
        });

    }


    // useEffect(() => {
    //     const firestore = getFirestore(firebaseInit);
    //     const collectionRef = collection(firestore, collectionName);

    //     const getCollectionData = onSnapshot(query(collectionRef), (querySnapshot) => {
    //         const documents: Array<any> = [];
    //         querySnapshot.forEach((doc) => {
    //             documents.push({ ...doc.data(), id: doc.id });
    //         });

    //         setDocs(documents);
    //     });

    //     return () => getCollectionData();

    // }, []);


    return [shopingCart, setShopingCart]
}
