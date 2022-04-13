import Head from 'next/head'
import Gallery from '../components/Gallery';
import Header from "../components/Header";

export default function Photografy() {


    return (
        <>
            <Head>
                <title>Tienda</title>
                <meta name="merchandising" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />
                
            </Head>

            <Header className='bg-black'/>

            <h1 className="text-4xl text-center my-10">Fotografia</h1>

            <div className="max-w-[90%] m-auto">
                <Gallery/>
            </div>
        </>
    )
}