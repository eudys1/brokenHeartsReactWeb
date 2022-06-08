import Image from "next/image";


interface ProductProps {
    id?: string;
    name?: string;
    price?: number;
    imageUrl?: string;
    category?: string;
    className?: string;
    onClick?: () => void;
}


export default function Product({ id, name, price, imageUrl = "", category, className = "" , onClick}: ProductProps) {

    return (
        <div className="w-fit">
            <div onClick={onClick} className={` ${className}`}>
                <div className="relative h-full">
                    <Image src={imageUrl} layout="fill" objectFit="contain" />
                </div>

                <span className="text-gray-500">{category}</span>
                <span className="text-xl">{name}</span>
                <strong className="">{price} €</strong>

            </div>
            <button className=" w-fit mx-auto px-5 py-3 block bg-slate-400 rounded text-white">Añadir al carrito</button>

        </div>
    )

}