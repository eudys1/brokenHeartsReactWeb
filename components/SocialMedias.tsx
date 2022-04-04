import Image from "next/image";


export default function SocialMedias(){


    return(
        <div className="flex justify-center gap-5 mt-5">
            <a href="" className=" transition duration-300 hover:opacity-50">
                <Image src="/bxl-youtube.svg" width={24} height={24} alt="youtube icon"/>
            </a>
            <a href="" className=" transition duration-300 hover:opacity-50">
                <Image src="/bxl-twitter.svg" width={24} height={24} alt="twitter icon"/>
            </a>
            <a href="" className=" transition duration-300 hover:opacity-50">
                <Image src="/bxl-instagram.svg" width={24} height={24} alt="instagram icon"/>
            </a>
        </div>
    )
}