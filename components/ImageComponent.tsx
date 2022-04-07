import Image from "next/image";

interface ImageComponentProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    scale: boolean;
    className?: string;
}


export default function ImageComponent({ src, width, height, alt, scale, className }: ImageComponentProps) {


    return (
        <>
            <div className={`${scale ? 'transition duration-500 hover:scale-110': 'transition duration-500 hover:backdrop-grayscale '}  ${className} `}>
                <Image src={src} width={width} height={height} alt={alt} />
            </div>
        </>
    )
}