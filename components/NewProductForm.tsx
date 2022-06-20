import { arrayUnion, collection, doc, documentId, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import { firebaseInit, storage } from "../firebase";
import InputFile from "./InputFile";

interface NewProductFormProps {
    className?: string;
    setProductData?: (data: any) => void;
}

const firestore = getFirestore(firebaseInit);

const FormValidation = Yup.object().shape({
    nombre: Yup.string().required("Introduce un nombre"),
    precio: Yup.number().required("Define un precio al producto"),

});


//TODO:loading animation when a new product is created
export default function NewProductForm({ className = "", setProductData }: NewProductFormProps) {
    const [files, setFiles] = useState<any[]>([]);
    const [currentCategory, setcurrentCategory] = useState('Ropa');
    const [isLoading, setIsLoading] = useState(false);

    const changeCategory = (newCategory: string) => {
        setcurrentCategory(newCategory)
    }

    async function handleOnSubmit(e: FormikValues) {
        setIsLoading(true);
        const formData: any = {};
        formData.quantity = 0;
        formData.product = e;
        const urlImages: any[] = [];

        formData.product.files = files;
        formData.product.images = urlImages;
        formData.product.imageName ="";
        formData.product.currentImage = "";
        formData.product.currentColor = "";
        formData.product.currentSize = "";



        const docRef = doc(collection(firestore, "products"));
        setDoc(docRef, {
            name: formData.product.nombre,
            price: formData.product.precio,
            images: formData.product.images,
            imageName: formData.product.imageName,
            currentImage: formData.product.currentImage,
            currentColor: formData.product.currentColor,
            currentSize: formData.product.currentSize,
            description: formData.product.descripcion,
            category: currentCategory,
            colors: formData.product.colores,
            sizes: formData.product.tallas,
        });


        //convert FileList to a normal Array
        const arrayFiles = Array.from(formData.product.files);

        arrayFiles.forEach((file: any) => {
            const storageRef = ref(storage, `productImages/${file.name}`);

            try {
                //upload image to storage
                uploadBytes(storageRef, file).then(
                    async () => {
                        await getDownloadURL(storageRef).then((url: any) => {
                            formData.product.images.push(url);

                            updateDoc(docRef, {
                                //update array of images of product to add the url
                                images: arrayUnion(url),
                                imageName: file.name
                            });

                        });
                    }
                );

            } catch (error) {
                console.log(error);
            }
        });


        //sending data to father component
        //optional chaining (?.) 
        setProductData?.(formData);

        //reset form values
        (document.getElementById('product-form') as HTMLFormElement).reset();
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="">
            <Formik
                initialValues={{ nombre: "", descripcion: "", precio: "", categoria: "", tallas: "", colores: "" }}
                onSubmit={handleOnSubmit}
                validationSchema={FormValidation}
            >

                <Form id="product-form">

                    <Field name="nombre" type="text" placeholder="Nombre *" className="w-full bg-[#e9f1fe] mt-3 px-4 py-3 rounded-md  focus:border-[#2286FF] " />
                    <div className="min-h-[25px]">
                        <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                    </div>

                    {/* <label htmlFor='descripcion' className='block text-[#f56c95] mt-3 font-semibold'>Déjanos tus preguntas:</label> */}
                    <Field name="descripcion" id="descripcion" as="textarea" placeholder="Descripción del producto" rows="3" className="w-full bg-[#e9f1fe] my-3 p-4 rounded-md  focus:border-[#2286FF]" />

                    <Field name="precio" type="number" placeholder="Precio del producto *" className="w-full bg-[#e9f1fe] mt-3 px-4 py-3 rounded-md  focus:border-[#2286FF] " />
                    <div className="min-h-[25px]">
                        <ErrorMessage name="precio" component="p" className='text-[#ff0000]' />
                    </div>

                    <div className="mt-3 flex gap-2">
                        <span>Elige una categoria: </span>
                        <select className="border-2 border-[#2286FF] rounded-md text-center" name="categoria" onChange={(e) => changeCategory(e.target.value)} value={currentCategory} >
                            <option value="Ropa">Ropa</option>
                            <option value="Otros Productos">Otros Productos</option>
                        </select>
                    </div>

                    <div className="my-4 flex gap-2 items-center flex-wrap">
                        <span>Tallas:</span>

                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="xs" />XS</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="s" />S</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="m" />M</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="l" />L</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="xl" />XL</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="tallas" value="xxl" />XXL</label>

                    </div>

                    <div className="mb-4 flex gap-2 items-center flex-wrap">
                        <span>Colores:</span>

                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="colores" value="black" />Negro</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="colores" value="blue-900" />Azul</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="colores" value="white" />Blanco</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="colores" value="red-700" />Rojo</label>
                        <label className="flex flex-row items-center gap-1"><Field className="w-4 h-4" type="checkbox" name="colores" value="pink-600" />Rosa</label>

                    </div>

                    <InputFile onFileSelected={(files: any) => setFiles(files)} />

                    <div className="grid mt-10">
                        <button type="submit"
                            disabled={isLoading}
                            className='justify-self-end inline-flex self-end py-2 px-5 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md'>
                            {isLoading ?
                                <div className="flex ">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creando producto...</span>
                                </div>
                                : "Crear producto"
                            }
                        </button>
                    </div>
                </Form>

            </Formik>
        </div>
    )

}