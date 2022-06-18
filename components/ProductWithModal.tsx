import Modal from "./Modal";
import Image from "next/image";
import SimpleProduct from "./SimpleProduct";
import { useFirestorage } from "../hooks/useFirestorage";
import { useEffect, useState } from "react";
import { useShopingCart } from "../context/shopingCartContext";

interface ProductWithModalProps {
    productData: any;
    className?: string;
    onClickButton?: () => void;
}

export default function ProductWithModal({ productData, className = "", onClickButton }: ProductWithModalProps) {
    const [docs] = useFirestorage("products");
    const [image, setImage] = useState<any>(productData.images[0]);
    const { shopingCart, defaultSetShopingCart, setShopingCart, getTotalPrice, getNumberOfDifferentItems }: any = useShopingCart();

    useEffect(() => {
        console.log("sss", productData);
        productData.currentImage = image

    }, [image]);


    function handleColor(color: any, currentProduct: any) {

        Object.keys(productData.images).forEach((index: string) => {
            productData.images[index].includes(color.target.value.split("-")[0]) && (
                setImage(productData.images[index]),
                productData.currentColor = color.target.value.split("-")[0]
            )

        })
        // defaultSetShopingCart(shopingCart);

    }


    function addToShopingCart(product: any) {

        const shopingCartProduct: any = {};
        shopingCartProduct.quantity = 1;
        shopingCartProduct.product = product;
        shopingCartProduct.productId = product.id;

        Object.keys(shopingCart).forEach((index: string) => {
            shopingCart[index].product.currentColor == product.currentColor
                ?
                setShopingCart([...shopingCart, shopingCartProduct], product)
                :
                defaultSetShopingCart([...shopingCart, shopingCartProduct])

            // console.log(shopingCart[index].product);
            // console.log(product);

        });

        //keepping all the products in the shoping cart and adding new ones
    }



    return (
        <Modal
            classNameWhenModalOpen="rounded-2xl bg-white p-6 text-left align-middle shadow-xl mx-2 "
            elementShownWhenModalIsClose={
                <SimpleProduct
                    onClickButton={onClickButton}
                    className='w-72 h-96 flex flex-col text-center hover:cursor-pointer gap-2'
                    category={productData.category}
                    imageUrl={productData.images[0]}
                    name={productData.name}
                    price={productData.price}
                />
            }
            modalDescription={
                <div className='flex flex-col lg:flex-row items-center max-w-[800px]'>
                    <div className='relative w-60 h-60 lg:min-h-[450px] lg:min-w-[450px]'>
                        <Image src={image} layout="fill" objectFit='contain' />
                    </div>
                    <div className='flex flex-col text-center px-10 gap-2 '>
                        <span className="text-2xl">{productData.name}</span>
                        <strong>{productData.price} €</strong>
                        <p >{productData.description} </p>
                        <div className="flex">
                            {Object.keys(productData.colors).map((index: string) => {

                                return (
                                    <button key={index}
                                        onClick={(color) => handleColor(color, productData)}
                                        value={productData.colors[index]}
                                        className={`border border-black rounded h-4 w-4 mr-2 mt-1 mb-1 bg-${productData.colors[index]}`} />
                                )
                            })
                            }

                        </div>

                        <div>
                            {/* <input className='border-2 rounded' type="number" name="" id="" /> */}
                            <button onClick={() => addToShopingCart(productData)} className="mt-3 py-3 px-7 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md">Añadir al carrito</button>
                        </div>

                        <hr className="m-5" />
                        <span className="text-slate-600">{productData.category}</span>
                    </div>
                </div>
            }
        />
    )

}