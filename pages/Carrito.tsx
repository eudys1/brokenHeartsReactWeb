import Head from 'next/head'
import { useShopingCart } from '../context/shopingCartContext';
import Router from 'next/router';
import NoSsr from '../components/NoSsr';
import Link from 'next/link';
import { useState } from 'react';

export default function Carrito() {
    const { shopingCart, defaultSetShopingCart, getTotalPrice, getNumberOfDifferentItems }: any = useShopingCart();
    const [quantity, setQuantity] = useState(1);

    function handleQuantity(currentQuantity: any, currentItem: any) {
        
        
        //change quantity in shopingCart
        shopingCart.forEach((item: any) => {
            if (JSON.stringify(item) == JSON.stringify(currentItem)) {
                item.quantity = Number(currentQuantity.target.value);
                setQuantity(Number(currentQuantity.target.value));
            }
        });

        defaultSetShopingCart(shopingCart);
    }

    //delete item from shopingCart
    function deleteProductFromCart(currentItem: any) {

        shopingCart.forEach((item: any, index: number) => {
            if (JSON.stringify(item) === JSON.stringify(currentItem)) {
                shopingCart.splice(index, 1);
            }
        });

        defaultSetShopingCart(shopingCart);
    }

    //checkout function 
    async function checkout() {
        const lineItems: any = [];

        shopingCart.forEach((item: any) => {
            const itemCheckOut: any = {};
            const price = item.product.price;

            itemCheckOut.quantity = item.quantity;
            itemCheckOut.price_data = {
                currency: 'eur',
                unit_amount: Number((price * 100).toFixed(2)),
                product_data: {
                    name: item.product.name,
                    description: item.product.description,
                    images: [item.product.images[0]],
                    metadata: {
                        color: item.product.currentColor,
                        size: item.product.currentSize,
                    }
                },

            }

            lineItems.push(itemCheckOut);
        });




        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(lineItems),
        });

        const data = await res.json();

        Router.push(data.session.url);
    }


    return (
        <NoSsr>
            <Head>
                <title>Carrito</title>
                <meta name="Carrito" content="Generated by Broken Hearts" />
                <meta charSet="utf-8" />
                <link rel="icon" href="/SORA-SOMBRA-BLANCA.png" />
            </Head>

            {/* <Header className=' justify-between ' /> */}

            <h1 className="text-4xl text-center pt-28 my-10">Carrito</h1>

            <div className="w-[80%] mx-auto   ">
                {Object.keys(shopingCart).length === 0
                    ?
                    <p className='text-xl text-center lg:mt-32'>El carrito está vacío, vuelve a la <Link href="/Tienda"><a className='text-[#2286FF] cursor-pointer hover:text-[#224877]'>Tienda</a></Link> para ver todos nuestros productos disponibles.</p>
                    :
                    <div className="flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden">
                        <div className='lg:w-3/4 bg-slate-50 p-5 flex flex-col divide-y-2 justify-center'>
                            {
                                shopingCart.map((item: any, index: number) => {

                                    return (
                                        // <div className="flex flex-row justify-between mb-4">
                                        <div key={index} className="flex flex-col w-fit mx-auto lg:w-full items-center lg:flex-row justify-around py-5">
                                            {item.product.currentImage ?
                                                <img src={item.product.currentImage} className="w-36 h-36" />
                                                :
                                                <img src={item.product.images[0]} className="w-36 h-36" />
                                            }
                                            <div className="flex flex-col">
                                                <div className='flex gap-4'>
                                                    {item.product.currentColor != "" && <span className='flex items-center gap-2'>Color: <span className='block w-4 h-4 rounded border' style={{ backgroundColor: item.product.currentColor }}></span></span>}
                                                    {item.product.currentSize != "" && <span className='flex items-center gap-2'>Talla: <span className='flex justify-center items-center border border-black rounded h-6 w-6 text-sm' >{item.product.currentSize}</span></span>}
                                                </div>
                                                <span className='text-xl '>{item.product.name}</span>
                                            </div>

                                            <input
                                                onChange={(currentQuantity) => handleQuantity(currentQuantity, item)}
                                                min={0} max={99}
                                                type="number"
                                                // defaultValue={item.quantity}
                                                value={item.quantity}
                                                className='w-10 text-center border-2 border-[#2286FF] rounded-md'
                                            />

                                            <strong>{item.product.price} €</strong>

                                            <button onClick={() => deleteProductFromCart(item)} className='font-bold hover:text-red-700'>X</button>
                                        </div>

                                        // </div>
                                    )
                                })
                            }
                        </div>
                        <div className='lg:w-1/4 flex flex-col p-5 gap-5 justify-center bg-gray-300'>
                            <strong>Subtotal: {getTotalPrice()} €</strong>
                            <hr />
                            <strong>Envio:</strong>
                            <p>El envio se realizara mediante la empresa UPS o CorreosExpress</p>
                            <p>Coste: 3€</p>
                            <hr />
                            <strong>Total: {getTotalPrice(3)} €</strong>
                            <button onClick={checkout} className="py-3 px-7 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md">Terminar compra</button>
                        </div>
                    </div>
                }

            </div>

        </NoSsr>
    )
}