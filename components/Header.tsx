import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";

interface HeaderProps {
    className?: string
}
export default function Header({ className }: HeaderProps) {


    return (
        <>
            <div className={` flex flex-row ${className} `}>
                <Link href="/"><a><Logo className="w-max"/></a></Link>


                <div className="hidden lg:flex gap-6 items-center text-white ">
                    <Link href="/"><a className="transition duration-300 hover:scale-125 " >Inicio</a></Link>
                    <Link href="/Photografy"><a className="transition duration-300 hover:scale-125" >Fotografía</a></Link>
                    <Link href="/"><a className="transition duration-300 hover:scale-125" >Tienda</a></Link>
                    <Link href="/Contact"><a className="transition duration-300 hover:scale-125 " >Contacto</a></Link>

 
                    <Link href="/"><a className=" pl-10 transition duration-300 hover:scale-125 w-max" > <Image src="/bx-user.svg" width={30} height={30} /></a></Link>
                    <Link href="/"><a className="transition duration-300 hover:scale-125 w-max" > <Image src="/bxs-cart.svg" width={30} height={30} /></a></Link>

                </div>

            </div>
        </>
    )
}