import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";

export default function Header() {


    return (
        <>
            <div className=" flex flex-row justify-around bg-black">
                <Logo />

                <div className="flex gap-6 items-center text-white">
                    <Link href="/"><a className="transition hover:scale-125 " >Inicio</a></Link>
                    <Link href="/"><a className="transition hover:scale-125" >Fotografía</a></Link>
                    <Link href="/"><a className="transition hover:scale-125" >Tienda</a></Link>
                    <Link href="/Contact"><a className="transition hover:scale-125" >Contacto</a></Link>
                </div>

                <div className="flex gap-6 items-center text-white">
                    <Link href="/"><a className="transition hover:scale-125" > <Image src="/bxs-cart.svg" width={30} height={30}/></a></Link>
                    <Link href="/"><a className="transition hover:scale-125" > <Image src="/bx-user.svg" width={30} height={30}/></a></Link>

                </div>
            </div>
        </>
    )
}