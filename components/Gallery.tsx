import { useEffect, useState } from "react";
import { useUserAuth } from "../context/authContext";
import { useFirestorage } from "../hooks/useFirestorage";
import UploadImage from "../functions/UploadImage";
import Modal from "./Modal";
import Image from "next/image";
import deleteDocumentFromStorage from "../functions/deleteDocumentFromStorage";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { firebaseInit } from "../firebase";
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
    const firestore = getFirestore(firebaseInit);
    const typesPermited = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'];
    const [isLoading, setIsLoading] = useState(false);

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

        if (docs.length == 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

    }, [docs]);

    // console.log("size: ", size);

    const deletePicture = async (directoryName: string, documentName: string, collectionName: string, documentId: string) => {

        // await deleteDocumentFirebase(collectionName, documentId);
        deleteDocumentFromStorage(directoryName, documentName);

        await deleteDoc(doc(firestore, collectionName, documentId));

    }

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


            {isLoading ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" stroke="#2286FF" className='h-24 w-h-24 mx-auto lg:mt-28'>
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="2">
                            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                            </path>
                        </g>
                    </g>
                </svg>
                :

                docs.length == 0 && isLoading
                    ? <p className="text-xl text-center lg:mt-32"> {"No hay fotos para mostrar :("} </p>
                    :
                    <div className={` md:masonry-2-col lg:masonry-4-col  `}>

                        {
                            docs.map((doc: any, index) => {
                                // console.log("size", size);
                                // console.log("img: ",doc);

                                { size && console.log("size: ", size[index]) }
                                return (


                                    <Modal key={index}
                                        showCrossCloseModal={true}
                                        elementShownWhenModalIsClose={
                                            <div className="relative mb-5 hover:cursor-pointer transition duration-300 hover:grayscale hover:brightness-50 ">
                                                {/* <Image  src={doc.url} width={size[index].width} height={size[index].height} /> */}
                                                {/* <Image  src={doc.url} layout="fill" objectFit="contain" /> */}
                                                <img className="rounded-md shadow-[0_4px_15px_-5px_rgba(0,0,0,0.5)]" src={doc.url} alt="" />
                                            </div>
                                        }
                                        modalDescription={
                                            <div className={`w-[350px] lg:w-[900px] h-[550px]`}>
                                                {/* <img className=" " src={doc.url} alt="" /> */}
                                                <Image className="" src={doc.url} layout="fill" objectFit="contain" />

                                            </div>
                                        }

                                        titleButtonCloseModal={
                                            // directoryName:string,documentName:string,collectionName:string,documentId:string
                                            user && user.rol == "admin" &&
                                            <button
                                                onClick={() => deletePicture('', doc.name, 'galleryImages', doc.id)}
                                                className="absolute top-0 right-0 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Eliminar foto</button>
                                        }
                                    />

                                );
                            })
                        }


                    </div>
            }
        </>
    )
}
