import Modal from "./Modal";
import Image from "next/image";
import SimpleProduct from "./SimpleProduct";

interface ProductWithModalProps {
    productData: any;
    className?: string;
    onClickButton?: () => void;
}

export default function ProductWithModal({ productData, className = "", onClickButton }: ProductWithModalProps) {
// console.log(productData);

    return (
        <Modal
            classNameWhenModalOpen="rounded-2xl bg-white p-6 text-left align-middle shadow-xl mx-2 "
            elementShownWhenModalIsClose={
                <SimpleProduct
                    onClickButton={onClickButton}
                    className='w-72 h-96 flex flex-col text-center hover:cursor-pointer gap-2'
                    category={productData.category}
                    imageUrl={productData.images[0]}
                    name={productData.name}
                    price={productData.price}
                />
            }
            modalDescription={
                <div className='flex flex-col lg:flex-row items-center max-w-[800px]'>
                    <div className='relative w-60 h-60 lg:h-[450px] lg:w-[450px]'>
                        <Image src={productData.images[0]} layout="fill" objectFit='contain' />
                    </div>
                    <div className='flex flex-col text-center px-10 gap-2 '>
                        <span className="text-2xl">{productData.name}</span>
                        <strong>{productData.price} €</strong>
                        <p >{productData.description} dddddddddddddddddddd break-all break-all break-all break-allbreak-allbreak-allbreak-allbreak-all</p>

                        {/* <div>
                            <input className='border-2 rounded' type="number" name="" id="" />
                            <button className=" w-fit mx-auto px-5 py-3  bg-slate-400 rounded text-white">Añadir al carrito</button>
                        </div> */}

                        <hr className="m-5"/>
                        <span className="text-slate-600">{productData.category}</span>
                    </div>
                </div>
            }
        />
    )

}