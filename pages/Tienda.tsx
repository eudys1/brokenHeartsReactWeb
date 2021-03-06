import Head from 'next/head'
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import NewProductForm from '../components/NewProductForm';

import ProductWithModal from '../components/ProductWithModal';
import { useFirestorage } from '../hooks/useFirestorage';
import { useShopingCart } from '../context/shopingCartContext';
import { useUserAuth } from '../context/authContext';
import deleteDocumentFromStorage from '../functions/deleteDocumentFromStorage';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../firebase';

export default function Tienda() {
    const { user }: any = useUserAuth();
    const [productData, setProductData] = useState<any>(null);
    const [docs] = useFirestorage("products");
    const { shopingCart, setShopingCart, getNumberOfDifferentItems }: any = useShopingCart();
    const firestore = getFirestore(firebaseInit);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (docs.length == 0) {
            setIsLoading(false);
        }
    }, [docs]);


    function addToShopingCart(product: any) {

        const shopingCartProduct: any = {};
        shopingCartProduct.quantity = 1;
        shopingCartProduct.product = product;
        shopingCartProduct.productId = product.id;

        //keepping all the products in the shoping cart and adding new ones
        setShopingCart([...shopingCart, shopingCartProduct], product);
    }

    const deleteProduct = async (directoryName: string, documentName: string, collectionName: string, documentId: string) => {

        deleteDocumentFromStorage(directoryName, documentName);

        //delete from firestore
        await deleteDoc(doc(firestore, collectionName, documentId));

    }

    return (
        <>
            <Head>
                <title>Tienda</title>
                <meta name="Tienda" content="Generated by Broken Hearts" />
                <meta charSet="utf-8" />
                <link rel="icon" href="/SORA-SOMBRA-BLANCA.png" />

            </Head>

            {/* <Header className=' justify-between ' /> */}
            <div className="mx-5 lg:max-w-[80%] lg:mx-auto pt-28">


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
                {isLoading ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" stroke="#2286FF" className='h-24 w-h-24 mx-auto lg:mt-28'>
                        <g fill="none" fillRule="evenodd">
                            <g transform="translate(1 1)" strokeWidth="2">
                                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                </path>
                            </g>
                        </g>
                    </svg>
                    :
                    // check this:
                    // (docs.length == 0 && !isLoading)
                    //     ? <p className="text-xl text-center lg:mt-32"> {"No hay productos para mostrar :("} </p>
                    //     :
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 ">
                            {
                                docs.map((item: any, index: number) => {

                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            {user && user.rol == "admin" &&
                                                <button onClick={() => deleteProduct('productImages', item.imageName, 'products', item.id)} className='self-end font-bold hover:text-red-700'>X</button>
                                            }
                                            <ProductWithModal productData={item} />
                                            <button onClick={() => addToShopingCart(item)} className="mt-3 py-3 px-7 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md">A??adir al carrito</button>
                                        </div>
                                    )
                                })
                            }
                        </div>


                }
            </div>

        </>
    )
}