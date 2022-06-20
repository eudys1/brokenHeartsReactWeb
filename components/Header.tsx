import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { useShopingCart } from "../context/shopingCartContext";
import NoSsr from "./NoSsr";
import MobileNavbar from "./MobileNavbar";

interface HeaderProps {
    className?: string
}
export default function Header({ className }: HeaderProps) {
    const {getNumberOfDifferentItems }: any = useShopingCart();

    return (

        <div className={` flex flex-row bg-black/80 backdrop-filter  fixed top-0 h-[68px] z-40 w-full px-7 ${className} `}>
            <div className="w-full h-full absolute inset-0 backdrop-blur-lg"></div>

            <div className="hidden lg:block">
                <Link href="/">
                    <a><Logo className="w-max" /></a>
                </Link>
            </div>


            <div className="lg:hidden">
                <MobileNavbar/>
            </div>
            
            <div className="hidden lg:flex gap-6 items-center text-white z-10">
                <Link href="/"><a className="transition duration-300 hover:scale-125 " >Inicio</a></Link>
                <Link href="/Photografy"><a className="transition duration-300 hover:scale-125" >Fotografía</a></Link>
                <Link href="/Shop"><a className="transition duration-300 hover:scale-125" >Tienda</a></Link>

                <Link href="/Account"><a className=" pl-10 transition duration-300 hover:scale-125 w-max" > <Image src="/bx-user.svg" width={30} height={30} /></a></Link>
                <Link href="/Carrito">
                    <a className="transition duration-300 hover:scale-125 w-max" >
                        <NoSsr>
                            <div className="relative px-1">
                                {getNumberOfDifferentItems() != 0 &&
                                    <span className="absolute bottom-0 right-0 text-red-700 text-xs font-bold">{getNumberOfDifferentItems()}</span>
                                }

                                <Image src="/bxs-cart.svg" width={30} height={30} priority />
                            </div>
                        </NoSsr>
                    </a>
                </Link>

            </div>


        </div>

    )
}