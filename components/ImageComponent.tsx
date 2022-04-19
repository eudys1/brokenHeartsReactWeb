import Image from "next/image";

interface ImageComponentProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    scale: boolean;
    className?: string;
}

//TODO: when clik open modal

export default function ImageComponent({ src, width, height, alt, scale, className }: ImageComponentProps) {


    return (

        <div className={` w-fit ${scale ? 'transition duration-500 hover:scale-110' : 'transition duration-300 hover:grayscale hover:brightness-50 '}  ${className} `}>
            <Image className="rounded-md" src={src} width={width} height={height} alt={alt} />
        </div>

    )
}