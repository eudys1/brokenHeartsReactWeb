import Head from 'next/head'
import Header from "../components/Header";
import { useUserAuth } from '../context/authContext';

export default function Shop() {
    const {user}:any = useUserAuth();

    
    return (
        <>
            <Head>
                <title>Tienda</title>
                <meta name="merchandising" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />
                
            </Head>

            <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg sticky top-0 h-[68px] w-full">
                <Header className=' justify-between mx-32 ' />
            </div>
            
            <h1 className="text-4xl text-center my-10">Tienda</h1>
            <div className="w-[600px] h-[700px] m-auto bg-slate-400 rounded p-7">
                tienda
            </div>
            
        </>
    )
}