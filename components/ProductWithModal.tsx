import Modal from "./Modal";
import Image from "next/image";
import SimpleProduct from "./SimpleProduct";

interface ProductWithModalProps {
    productData: any;
    className?: string;
}

export default function ProductWithModal({ productData, className = "" }: ProductWithModalProps) {


    return (
        <Modal
            className={``}
            elementShownWhenModalIsClose={
                <SimpleProduct className='w-72 h-96 flex flex-col text-center hover:cursor-pointer' category={productData.category} imageUrl={productData.images[0]} name={productData.name} price={productData.price} />
            }
            modalDescription={
                <div className='flex'>
                    <div className='relative h-[inherit] w-full'>
                        <Image src={productData.images[0]} layout="fill" objectFit='contain' />
                    </div>
                    <div className='flex flex-col'>
                        <span>{productData.name}</span>
                        <strong>{productData.price} €</strong>
                        <p>{productData.description}</p>
                        
                        <div>
                            <input className='border-2 rounded' type="number" name="" id="" />
                            <button className=" w-fit mx-auto px-5 py-3  bg-slate-400 rounded text-white">Añadir al carrito</button>
                        </div>

                        <hr />
                        <span>{productData.category}</span>
                    </div>
                </div>
            }
        />
    )

}