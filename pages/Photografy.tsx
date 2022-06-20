import Head from 'next/head'
import Gallery from '../components/Gallery';
import Header from "../components/Header";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Photografy() {

    const settings = {
        centerMode: true,
        autoPlay: true,
        centerSlidePercentage: 70,
        emulateTouch: true,
        swipeable: true,
        infiniteLoop: true,
        showArrows: false,
        showStatus: false,
        showThumbs: false,
        interval: 3000,


    };


    return (
        <>
            <Head>
                <title>Fotografías</title>
                <meta name="Fotografías" content="Generated by Broken Hearts" />
                <link rel="icon" href="/SORA-SOMBRA-BLANCA.png" />
            </Head>

            {/* <Header className='justify-between ' /> */}

            {/* <h1 className="text-4xl text-center pt-28 my-10">Fotografia</h1> */}

            <div className="mx-5 lg:max-w-[80%] pt-28 lg:mx-auto">
                <Carousel {...settings} className="mb-8">

                    <div className="mx-3  ">
                        <Image priority className='rounded-md' src="/taza-cafe.jpg" width={900} height={400} objectFit="cover" />
                    </div>
                    <div className="mx-3  ">
                        <Image priority className='rounded-md' src="/agua-playa.jpg" width={900} height={400} objectFit="cover" />
                    </div>
                    <div className="mx-3  ">
                        <Image priority className='rounded-md' src="/rio-berna-boat.jpg" width={900} height={400} objectFit="cover" />
                    </div>
                    <div className="mx-3  ">
                        <Image priority className='rounded-md' src="/flores.jpg" width={900} height={400} objectFit="cover" />
                    </div>
                    <div className="mx-3  ">
                        <Image priority className='rounded-md' src="/ojos-cara.jpg" width={900} height={400} objectFit="cover" />
                    </div>
                </Carousel>


                <Gallery />

            </div>


        </>
    )
}