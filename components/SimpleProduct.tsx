import Image from "next/image";


interface SimpleProductProps {
    id?: string;
    name?: string;
    price?: number;
    imageUrl?: string;
    category?: string;
    className?: string;
    buttonTitle?: string;
    onClickDiv?: () => void;
    onClickButton?: () => void;
}


export default function SimpleProduct({buttonTitle, id, name, price, imageUrl = "/", category, className = "" , onClickDiv, onClickButton}: SimpleProductProps) {

    return (
        <div className="w-fit mx-auto">
            <div onClick={onClickDiv} className={` ${className}`}>
                <div className="relative h-72">
                    <Image src={imageUrl} layout="fill" objectFit="contain" unoptimized priority/>
                </div>

                <span className="text-gray-500">{category}</span>
                <span className="text-xl">{name}</span>
                <strong className="">{price} €</strong>

            </div>
            
            {buttonTitle&&
                <button onClick={onClickButton} className=" w-fit mx-auto px-5 py-3 block bg-slate-400 rounded text-white">Añadir al carrito</button>
            }
        </div>
    )

}