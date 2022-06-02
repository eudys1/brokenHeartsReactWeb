import Head from 'next/head'
import Header from '../components/Header'
import Image from "next/image";
import SmallGalery from '../components/SmallGalery';
import Link from 'next/link';
import Contact from '../components/Contact';



export default function Home() {

	return (
		<div className="">
			<Head>
				<title>Broken Hearts</title>
				<meta name="Página de inicio" content="Generated by Broken Hearts" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="bg-no-repeat bg-cover bg-fixed min-h-[750px]" style={{ backgroundImage: "url(/fondo-header.jpg)" }}>
				<Header className='justify-between mx-32 mb-10' />

				<div className='flex gap-10 justify-center items-center flex-col lg:flex-row lg:items-start'>
					<div className="pt-24 ">
						<div className="transition duration-500 hover:scale-110">
							<Image src="/edificios.jpg" width={320} height={384} alt="edificios" />
						</div>
					</div>
					<div className="">
						<div className="transition duration-500 hover:scale-110">
							<Image src="/persona-puente.jpg" width={320} height={384} alt="persona puente" />
						</div>
					</div>
					<div className="md:pt-36 ">
						<div className='transition duration-500 hover:scale-110'>
							<Image src="/paraguas.jpg" width={320} height={384} alt="paraguas" />
						</div>
					</div>
				</div>

			</div>

			<div className="w-4/5 mx-auto py-10 my-5 flex border-b-2 border-zinc-300  flex-col items-center	font-['Arial'] text-[18px]">
				<p>¡HOLA!,</p>
				<p>Mi nombre es Jesús y soy fotógrafo.</p>
				<p>Bienvenida, Bienvenido, llegaste a un lugar donde hay mucho por recorrer.</p>
			</div>


			<div className=''>
				<SmallGalery />
			</div>

			<div className=" mx-auto flex flex-col md:flex-row gap-8 md:gap-0 border-t-2 border-zinc-300 py-10 max-w-[90%] font-['Arial']">

				<div className="md:pt-16 flex flex-col  md:w-1/2 px-5 text-center md:text-right	gap-4 md:order-last ">
					<h3 className='text-2xl text-[#f56c95]'>¿Tienes dudas?</h3>
					<h1 className='text-5xl font-bold text-[#2286FF]'>Contacta con nosotros</h1>
					<p className=''>Puedes contactar con nosotros a través del siguiente formulario para dudas sobre nuestro trabajo, sesiones de fotos, productos de nuestra web, etc.</p>
				</div>

				<div className="md:w-1/2 px-5 ">
					<Contact />
				</div>
			</div>


			<div className="w-4/5 mx-auto py-10 my-5 flex border-t-2 border-zinc-300  flex-col items-center	font-['Arial'] text-[18px] text-center">
				<p>Para más información sobre reservas de sesiones, proximos</p>
				<p>projectos y más visita mi Instagram o constacanos usando el formulario de arriba.</p>
				<p>También puedes visitar nuestra <Link href="/Shop"><span className='text-[#2286FF] cursor-pointer'>Tienda</span></Link> y ver el merch de la marca</p>
				<p>que tenemos disponible.</p>
			</div>




			{/* <div className='bg-black px-5'>
				<Footer className='text-center lg:text-left' />
			</div> */}
		</div >
	)
}


