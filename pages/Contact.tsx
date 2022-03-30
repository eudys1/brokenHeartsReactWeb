import Head from 'next/head'
import Header from "../components/Header";

export default function Contact() {


    return (
        <>
            <Head>
                <title>Contacto</title>
                <meta name="Página de contacto" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <h1 className="text-4xl text-center my-10">Contacto</h1>
            <div className="w-[600px] h-[700px] m-auto bg-slate-400 rounded p-7">
                formulario
            </div>
        </>
    )
}