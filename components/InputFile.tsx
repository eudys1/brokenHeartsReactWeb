import { useState } from "react";


interface InputFileProps {
    className?: string;
    multiple?: boolean;
    onFileSelected?: any;
    onFileSelectedError?: (error: string) => void;
    // onFileSelectedError?:string;

}

export default function InputFile({ className = "", multiple = false, onFileSelected, onFileSelectedError }: InputFileProps) {
    const typesPermited = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'];
    // const [error, setError] = useState('');

    function handleInput(e: any) {
        console.log("e: ", e.target.files);
        const files = e.target.files;

        // if (files && typesPermited.includes(files.type)) {
            onFileSelected(files)
        // }else{
        //     setError("Archivo no permitido solo (.svg, .jpg o .png)");
        // }
    }

    return (
        <div className={` ${className}`}>
            <input type="file" name="imagenes" onChange={handleInput} multiple />
            {/* {error && <p className="text-[#ff0000]">{error}</p>} */}
        </div>
    )
}