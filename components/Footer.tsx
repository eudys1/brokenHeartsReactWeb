import Link from "next/link"
import Logo from "./Logo"
import SocialMedias from "./SocialMedias"

interface FooterrProps {
    className?: string
}

export default function Footer({ className }: FooterrProps) {


    return (
        <div className={`min-h-48 flex flex-col lg:flex-row  justify-between items-center mx-32 py-5 ${className}`}>
            <div className="flex flex-col">
                <Link href="/"><a><Logo className="w-max"/></a></Link>
                <SocialMedias />
            </div>

            <div className="flex h-full items-end  text-[#7A7A7A] ">
                <p>Copyright © 2022 Broken Hearts</p>
            </div>

            <div className="flex flex-col text-white gap-3">
                <Link href="/Contact"><span className="font-['Arial'] font-bold text-[15px] cursor-pointer hover:text-[#2286FF] transition duration-200">Contacto</span></Link>
                <Link href="/Privacity"><span className="font-['Arial'] font-bold text-[15px] cursor-pointer hover:text-[#2286FF] transition duration-200">Política de privacidad</span></Link>
                <Link href="/Return"><span className="font-['Arial'] font-bold text-[15px] cursor-pointer hover:text-[#2286FF] transition duration-200">Política de devolucion y reembolsos</span></Link>
            </div>
        </div>
    )
}