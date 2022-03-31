import Image from "next/image";


export default function SmallGalery() {


    return (
        <>
            <div className=' p-10'>
                <div className="flex gap-10 mb-10 justify-center items-center flex-col lg:flex-row lg:items-start">

                    <div className='transition hover:scale-110'>
                        <Image src="/marta.jpg" width={250} height={300} alt="marta" />
                    </div>

                    <div className='transition hover:scale-110'>
                        <Image src="/jaime.jpg" width={300} height={300} alt="jaime" />
                    </div>

                    <div className='transition hover:scale-110'>
                        <Image src="/3personas-skate.jpg" width={250} height={300} alt="3personas en skate" />
                    </div>

                </div>

                <div className="flex justify-center items-center">
                    <div className='transition hover:scale-110'>
                        <Image src="/alberto.jpg" width={880} height={290} alt="alberto" />
                    </div>
                </div>
            </div>
        </>
    )
}