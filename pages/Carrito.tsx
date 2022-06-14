import Head from 'next/head'
import Header from "../components/Header";
import { useUserAuth } from '../context/authContext';
import { useShopingCart } from '../context/shopingCartContext';
import Router from 'next/router';
import NoSsr from '../components/NoSsr';

export default function Carrito() {
    const { user }: any = useUserAuth();
    const { shopingCart, getTotalPrice, getNumberOfDifferentItems }: any = useShopingCart();

    console.log(shopingCart);

    async function checkout() {
        const lineItems: any = [];

        shopingCart.forEach((item: any) => {
            const lineItems2: any = {};
            lineItems2.quantity = item.quantity;
            lineItems2.price_data = {
                currency: 'eur',
                unit_amount: (item.product.price) * 100,
                product_data: {
                    name: item.product.name,
                    description: item.product.description,
                    images: [item.product.images[0]],
                },
            }


            lineItems.push(lineItems2);
        });

        console.log("ds", lineItems);



        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(lineItems),
        });

        const data = await res.json();
        console.log(data);

        Router.push(data.session.url);
    }


    return (
        <NoSsr>
            <Head>
                <title>Carrito</title>
                <meta name="merchandising" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

                <Header className=' justify-between ' />

            <h1 className="text-4xl text-center pt-28 my-10">Carrito</h1>

            <div className="w-[90%] mx-auto  shadow-lg rounded-lg overflow-hidden ">

                <div className="flex flex-col lg:flex-row">
                    <div className='lg:w-3/4 bg-slate-50 p-5 flex flex-col divide-y-2 '>
                        {shopingCart.map((item: any, index: number) => {
                            return (
                                // <div className="flex flex-row justify-between mb-4">
                                <div key={index} className="flex flex-col w-fit mx-auto lg:w-full items-center lg:flex-row justify-around py-5">
                                    <img src={item.product.images[0]} className="w-36 h-36" />
                                    <div className="text-xl flex flex-col">
                                        <span>{item.product.category}</span>
                                        <span>{item.product.name}</span>
                                    </div>
                                    <div>
                                        <input type="number" name="" id="" defaultValue={item.quantity} />
                                    </div>
                                    <strong>{item.product.price} €</strong>
                                
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
                        <strong>Total: {getTotalPrice() + 3} €</strong>
                        <button onClick={checkout} className="bg-red-300  py-3 px-5 rounded-md hover:bg-red-400">Terminar compra</button>
                    </div>
                </div>

            </div>

        </NoSsr>
    )
}