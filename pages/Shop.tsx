import Head from 'next/head'
import { useState } from 'react';
import Header from "../components/Header";
import Modal from '../components/Modal';
import NewProductForm from '../components/NewProductForm';

import ProductWithModal from '../components/ProductWithModal';
import { useFirestorage } from '../hooks/useFirestorage';
import { useShopingCart } from '../context/shopingCartContext';
import { useUserAuth } from '../context/authContext';
import deleteDocumentFromStorage from '../functions/deleteDocumentFromStorage';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../firebase';

export default function Shop() {
    const { user }: any = useUserAuth();
    const [productData, setProductData] = useState<any>(null);
    const [docs] = useFirestorage("products");
    const { shopingCart, setShopingCart, getNumberOfDifferentItems }: any = useShopingCart();
    const firestore = getFirestore(firebaseInit);


    function addToShopingCart(product: any) {

        const shopingCartProduct: any = {};
        shopingCartProduct.quantity = 1;
        shopingCartProduct.product = product;
        shopingCartProduct.productId = product.id;


        //keepping all the products in the shoping cart and adding new ones
        setShopingCart([...shopingCart, shopingCartProduct], product);
    }

    const deleteProduct = async (directoryName: string, documentName: string, collectionName: string, documentId: string) => {

        // await deleteDocumentFirebase(collectionName, documentId);
        deleteDocumentFromStorage(directoryName, documentName);

        await deleteDoc(doc(firestore, collectionName, documentId));

    }

    return (
        <>
            <Head>
                <title>Tienda</title>
                <meta name="merchandising" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />

            </Head>

            {/* <Header className=' justify-between ' /> */}
            <div className="w-[80%] mx-auto pt-28">


                {/* CREAR NUEVO PRODUCTO: */}
                {user && user.rol == "admin" &&
                    <Modal
                        classNameWhenModalOpen='rounded-2xl bg-white p-6 text-left align-middle shadow-xl m-3 '
                        elementShownWhenModalIsClose={
                            <button className="mb-10 rounded-md bg-[#d41ed5] hover:bg-[#be25bf] py-3 px-7 font-bold text-white ">
                                Crear producto
                            </button>
                        }
                        classNameWhenModalClose="w-fit mx-auto"
                        openModalButtonTitle='Crear producto'
                        modalTitle='Crea un nuevo producto'
                        cerrarModal={false}
                        modalDescription={<NewProductForm setProductData={setProductData} />}
                    />
                }


                {/* PRODUCTOS: */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 ">
                    {docs.map((item: any, index: number) => {
                        return (
                            <div key={index} className="flex flex-col items-center">
                                {user && user.rol == "admin" &&
                                    <button onClick={() => deleteProduct('productImages', item.imageName, 'products', item.id)} className='self-end font-bold hover:text-red-700'>X</button>
                                }
                                <ProductWithModal productData={item} />
                                <button onClick={() => addToShopingCart(item)} className="mt-3 py-3 px-7 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md">Añadir al carrito</button>
                            </div>
                        )
                    })
                    }
                </div>

            </div>

        </>
    )
}