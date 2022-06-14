import { arrayUnion, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
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



export default function NewProductForm({ className = "", setProductData }: NewProductFormProps) {
    const [files, setFiles] = useState<any[]>([]);
    const [currentCategory, setcurrentCategory] = useState('ropa');

    const changeCategory = (newCategory: string) => {
        setcurrentCategory(newCategory)
    }

    async function handleOnSubmit(e: FormikValues) {
        const formData: any = {};
        formData.quantity = 0;
        formData.product = e;
        const urlImages: any[] = [];

        formData.product.files = files;
        formData.product.images = urlImages;


        const docRef = doc(collection(firestore, "products"));
        setDoc(docRef, {
            name: formData.product.nombre,
            price: formData.product.precio,
            images: formData.product.images,
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

                            //update array of images of product to add the url
                            updateDoc(docRef, {
                                images: arrayUnion(url)
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
        
        // location.reload();

    }

    return (
        <div className="">
            <Formik
                initialValues={{ nombre: "", descripcion: "", precio: "", categoria: "", tallas: "", colores: "" }}
                onSubmit={handleOnSubmit}
                validationSchema={FormValidation}
            >

                <Form>

                    <Field name="nombre" type="text" placeholder="Nombre *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                    <div className="min-h-[25px]">
                        <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                    </div>

                    {/* <label htmlFor='descripcion' className='block text-[#f56c95] mt-3 font-semibold'>Déjanos tus preguntas:</label> */}
                    <Field name="descripcion" id="descripcion" as="textarea" placeholder="Descripción del producto" rows="4" className="w-full bg-[#e9f1fe] my-3 p-4 rounded-md  focus:border-[#2286FF]" />

                    <Field name="precio" type="number" placeholder="Precio del producto *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                    <div className="min-h-[25px]">
                        <ErrorMessage name="precio" component="p" className='text-[#ff0000]' />
                    </div>

                    <div className="mt-3">
                        <span>Elige una categoria: </span>
                        <select name="categoria" onChange={(e) => changeCategory(e.target.value)} value={currentCategory} >
                            <option value="ropa" >Ropa</option>
                            <option value="otros">Otros Productos</option>
                        </select>
                    </div>

                    <div className="my-3">
                        <span>Tallas:</span>

                        <label><Field type="checkbox" name="tallas" value="xs" />XS</label>
                        <label><Field type="checkbox" name="tallas" value="s" />S</label>
                        <label><Field type="checkbox" name="tallas" value="m" />M</label>
                        <label><Field type="checkbox" name="tallas" value="l" />L</label>
                        <label><Field type="checkbox" name="tallas" value="xl" />XL</label>
                        <label><Field type="checkbox" name="tallas" value="xxl" />XXL</label>

                    </div>

                    <div>
                        <span>Colores:</span>

                        <label><Field type="checkbox" name="colores" value="negro" />Negro</label>
                        <label><Field type="checkbox" name="colores" value="azul" />Azul</label>
                        <label><Field type="checkbox" name="colores" value="blanco" />Blanco</label>
                        <label><Field type="checkbox" name="colores" value="rojo" />Rojo</label>
                        <label><Field type="checkbox" name="colores" value="rosa" />Rosa</label>

                    </div>

                    <InputFile onFileSelected={(files: any) => setFiles(files)} />

                    <div className=" grid mt-10">
                        <button type="submit" className='justify-self-end inline-flex self-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                            
                            Crear producto</button>
                    </div>
                </Form>

            </Formik>
        </div>
    )

}