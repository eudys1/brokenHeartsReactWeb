import Image from "next/image";
import Modal from "./Modal";

interface ImageComponentProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    scale?: boolean;
    className?: string;
}

//TODO: when clik open modal

export default function ImageComponent({ src, width, height, alt, scale, className="" }: ImageComponentProps) {


    return (

        <Modal
            showCrossCloseModal={false}
            elementShownWhenModalIsClose={
                <div className={`hover:cursor-pointer w-fit ${scale ? 'transition duration-500 hover:scale-110' : 'transition duration-300 hover:grayscale hover:brightness-50 '}  ${className} `}>
                    <Image className="rounded-md" src={src} width={width} height={height} alt={alt} priority />
                </div>
            }
            modalDescription={
                    <Image className="rounded-md" src={src} width={(width+100)} height={(height+100)} alt={alt} priority />

            }

        />



    )
}