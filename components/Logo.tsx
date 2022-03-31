import Image from "next/image";
interface LogoProps {
    className?: string
}


export default function Logo({ className }: LogoProps) {
    return (
        <div className={`${className}`}>
            <Image
                src="/logo2png.png"
                alt="logo broken hearts"
                width={180}
                height={63}
            />
        </div>
    );
}
