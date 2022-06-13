import { useEffect, useState } from "react";
import { useUserAuth } from "../context/authContext";
import { useFirestorage } from "../hooks/useFirestorage";
import UploadImage from "../functions/UploadImage";
import Modal from "./Modal";

//get with and height of image
const getImageSize = (url: string) => {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        let wi;
        let he;
        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
            wi = img.naturalWidth;
            he = img.naturalHeight;
        };
        img.onerror = () => {
            reject(new Error("Error loading image"));
        };
        img.src = url;
        // console.log(wi, he);

    });
};

async function runGetImageSize(url: string) {

    const img = await getImageSize(url);

    // console.log("dddd: ", img);
    return img;

}

export default function Gallery() {
    const { user }: any = useUserAuth();
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [docs] = useFirestorage('galleryImages');
    // let size: any[] = [];
    const [size, setSize] = useState<Array<any>>([]);

    const typesPermited = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'];

    const handleUpload = (e: any) => {
        //no multiple files allowed
        const fileSelected = e.target.files[0];

        if (fileSelected && typesPermited.includes(fileSelected.type)) {
            UploadImage(fileSelected);
            setFile(fileSelected);
            setError('');
        } else {
            setFile(null);
            setError('Archivo no permitido solo (.svg, .jpg o .png)');
        }

    }

    useEffect(() => {

        {
            docs &&
                docs.map(async (doc: any) => {
                    // console.log(doc);
                    const x: any = await runGetImageSize(doc.url);
                    console.log("x: ", x.width);
                    // setSize(size.push(x));
                    size.push(x);

                });
        }

        console.log("aaaaa", size);
        console.log("aaaaa", size[2]);

    }, [docs]);

    // console.log("size: ", size);

    return (
        <>
            {user && user.rol == "admin" &&

                <form action="" className="w-fit mx-auto my-5">
                    <label>
                        <input type="file" onChange={handleUpload} className="hidden" />
                        <span className="block w-16 h-16 text-5xl text-center text-[#2286FF] border-[#2286FF] rounded-full border-2  cursor-pointer hover:border-[#24599a] hover:text-[#24599a]">+</span>
                    </label>
                </form>
            }


            {error && <p className="text-red-500 text-center">{error}</p>}

            {console.log("ssss", docs)}

            <div className={` md:masonry-2-col lg:masonry-4-col  `}>

                {
                    docs.map((doc: any, index) => {
                        // console.log("size", size);

                        { size && console.log("size: ", size[index]) }
                        return (


                            <Modal
                                elementShownWhenModalIsClose={
                                    <div className=" mb-5 hover:cursor-pointer shadow-xl">
                                        {/* <Image  src={doc.url} width={size[index].width} height={size[index].height} /> */}
                                        {/* <Image  src={doc.url} layout="fill" objectFit="contain" /> */}
                                        <img src={doc.url} alt=""/>
                                    </div>
                                }
                                modalDescription={
                                    <img src={doc.url} alt=""/>
                                }
                            />

                        );
                    })
                }


            </div>
        </>
    )
}
