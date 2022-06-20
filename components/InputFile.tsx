
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
        const files = e.target.files;
        // if (files && typesPermited.includes(files.type)) {
            onFileSelected(files)
        // }else{
        //     setError("Archivo no permitido solo (.svg, .jpg o .png)");
        // }
    }

    return (
        <div className={` ${className}`}>
            <input
            className=" w-full bg-[#e9f1fe] rounded  cursor-pointer p-1" 
            type="file" name="imagenes" onChange={handleInput} multiple required />
            {/* {error && <p className="text-[#ff0000]">{error}</p>} */}
        </div>
    )
}