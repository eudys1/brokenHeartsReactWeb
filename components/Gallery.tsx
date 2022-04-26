import { useState } from "react";
import ImageComponent from "./ImageComponent";
import ProgressBar from "./ProgressBar";



export default function Gallery() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const typesPermited = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'];

    const handleUpload = (e: any) => {
        //no multiple files allowed
        let selected = e.target.files[0];

        if (selected && typesPermited.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Archivo no permitido solo (.svg, .jpg o .png)');
        }

    }

    return (
        <>
            <form action="" className="w-fit mx-auto">
                <label>
                    <input type="file" onChange={handleUpload} className="hidden"/>
                    <span className="block w-16 h-16 text-5xl text-center text-[#2286FF] border-[#2286FF] rounded-full border-2  cursor-pointer hover:border-[#24599a] hover:text-[#24599a]">+</span>
                </label>
            </form>

            {/* {
                file &&
                console.log("file: ", file)
            } */}

            {error && <p className="text-red-500 text-center">{error}</p>}
            {file && <ProgressBar file={file} setFile={setFile} />}


            <div className={` md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit `}>





                {/* <ImageComponent className="" src={"/marta.jpg"} width={450} height={300} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={250} height={350} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={100} height={450} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={200} height={350} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={450} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={350} height={200} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={300} height={500} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={300} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={250} height={350} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={450} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={250} height={300} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={450} height={500} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={300} height={450} alt={"jaime"} scale={true} /> */}
            </div>
        </>
    )
}