import Modal from "./Modal";
import Image from "next/image";
import SimpleProduct from "./SimpleProduct";
import { useEffect, useState } from "react";
import { useShopingCart } from "../context/shopingCartContext";

interface ProductWithModalProps {
    productData: any;
    className?: string;
    onClickButton?: () => void;
}

export default function ProductWithModal({ productData, className = "", onClickButton }: ProductWithModalProps) {
    const [image, setImage] = useState<any>(productData.images[0]);
    const [size, setSize] = useState<string>("");
    const { shopingCart, defaultSetShopingCart, setShopingCart, getTotalPrice, getNumberOfDifferentItems }: any = useShopingCart();
    const colors = ["black", "blue", "pink", "red"];

    useEffect(() => {
        productData.currentImage = image

    }, [image, []]);

    useEffect(() => {
        //setting the default color of the product 
        colors.forEach((color: any) => {
            if (image?.includes(color)) {
                productData.currentColor = color;
            }
        });

    }, []);

    function handleColor(color: any, currentProduct: any) {

        Object.keys(productData.images).forEach((index: string) => {
            productData.images[index].includes(color.target.value.split("-")[0]) && (
                setImage(productData.images[index]),
                productData.currentColor = color.target.value.split("-")[0]
            )

        })

    }

    function handleSize(size: any, currentProduct: any) {

        console.log(size.target.value);
        // setSize(size.target.value);
        productData.currentSize = size.target.value;
        // Object.keys(productData.sizes).forEach((index: string) => {
        //     productData.sizes[index].includes(size.target.value.split("-")[0]) && (
        //         setImage(productData.sizes[index]),
        //         productData.currentSize = size.target.value.split("-")[0]
        //     )

        // })

    }

    function addToShopingCart(product: any, imageColor: any) {

        const shopingCartProduct: any = {};
        shopingCartProduct.quantity = 1;
        shopingCartProduct.product = product;
        shopingCartProduct.productId = product.id;

        shopingCart.length == 0
            ?
            defaultSetShopingCart([...shopingCart, shopingCartProduct])
            :
            setShopingCart([...shopingCart, shopingCartProduct], product);

    }



    return (
        <Modal
            classNameWhenModalOpen="rounded-2xl bg-white p-6 text-left align-middle shadow-xl mx-2 "
            elementShownWhenModalIsClose={
                <SimpleProduct
                    onClickButton={onClickButton}
                    className='w-72 h-96 flex flex-col text-center hover:cursor-pointer gap-2'
                    category={productData.category}
                    imageUrl={productData?.images[0]}
                    name={productData.name}
                    price={productData.price}
                />
            }
            modalDescription={
                <div className='flex flex-col lg:flex-row items-center max-w-[800px]'>
                    <div className='relative w-60 h-60 lg:min-h-[450px] lg:min-w-[450px]'>
                        <Image src={image} layout="fill" objectFit='contain' unoptimized priority />
                    </div>
                    <div className='flex flex-col text-center px-10 gap-2 '>
                        <span className="text-2xl">{productData.name}</span>
                        <strong>{productData.price} €</strong>
                        <p >{productData.description} </p>
                    
                        {productData.colors &&
                        <div className="flex justify-center">
                            {Object.keys(productData.colors).map((index: string) => {

                                return (
                                    <button key={index}
                                        onClick={(color) => handleColor(color, productData)}
                                        value={productData.colors[index]}
                                        style={{ backgroundColor: productData.colors[index].split("-")[0] }}
                                        className={`border border-black rounded h-4 w-4 mr-2 mt-1 mb-1 `} />
                                )
                            })
                            }
                        </div>
                        }

                        {productData.sizes &&
                        <div className="flex justify-center gap-2">
                            {Object.keys(productData.sizes).map((index: string) => {

                                return (
                                    <button key={index}
                                        onClick={(size) => handleSize(size, productData)}
                                        value={productData.sizes[index]}
                                        className={`flex justify-center items-center border border-black rounded h-7 w-7 text-sm focus:font-bold focus:bg-blue-500 focus:text-white  `} >
                                        {productData.sizes[index].toUpperCase()}
                                    </button>
                                )
                            })
                            }
                        </div>
                    
                        }

                        <div>
                            {/* <input className='border-2 rounded' type="number" name="" id="" /> */}
                            <button onClick={() => addToShopingCart(productData, image)} className="mt-3 py-3 px-7 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md">Añadir al carrito</button>
                        </div>

                        <hr className="m-5" />
                        <span className="text-slate-600">{productData.category}</span>
                    </div>
                </div>
            }
        />
    )

}