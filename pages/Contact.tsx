import Head from 'next/head'
import Header from "../components/Header";
import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';

const FormValidation = Yup.object().shape({
    nombre: Yup.string().required("Introduce un nombre"),
    apellidos: Yup.string(),
    dudas: Yup.string(),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),
    privacityPolicy: Yup.boolean().oneOf([true], 'Debes aceptar las políticas de privacidad').required(),

});

//TODO: use sendGrid and api from next to meke usefull this form

export default function Contact() {
    async function handleOnSubmit(e: FormikValues) {
        // e.preventDefault();
        const allContactData = e;

        await fetch('/api/mail', {
            method: 'POST',
            body: JSON.stringify(allContactData),
        }).then(res => res.json())

        console.log("No api", allContactData);

    }

    return (
        <>
            {/* <Head>
                <title>Contacto</title>
                <meta name="Página de contacto" content="Generated by Broken Hearts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-black">
                <Header className=' justify-between mx-32 mb-10' />
            </div>

            <h1 className="text-4xl text-center mt-10">Contacto</h1> */}

            <div className=" mx-auto bg-white rounded-lg py-7 px-10 ">
                <Formik
                    initialValues={{ nombre: "", apellidos: "", email: "", dudas: "", privacityPolicy: false }}
                    onSubmit={handleOnSubmit}
                    validationSchema={FormValidation}
                >
                    <Form>

                        <Field name="nombre" type="text" placeholder="Nombre *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        
                        <div className="min-h-[25px]">
                            <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                        </div>

                        <Field name="apellidos" type="text" placeholder="Apellidos" className="w-full bg-[#e9f1fe] mb-[25px] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />

                        <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        <div className="min-h-[25px]">
                            <ErrorMessage name="email" component="p" className='text-[#ff0000]' />
                        </div>

                        <label htmlFor='dudas' className='block text-[#f56c95] mt-3 font-semibold'>Déjanos tus preguntas:</label>
                        <Field name="dudas" id="dudas" as="textarea" placeholder="Escribe tu duda" rows="4" className="w-full bg-[#e9f1fe] my-3 p-4 rounded-md  focus:border-[#2286FF]" />

                        <label className='block '>
                            <Field name="privacityPolicy" type="checkbox" />
                            He leído y acepto la <a href="" className='text-[#f56c95] font-semibold'>políticas de privacidad.</a>
                        </label>
                        <div className="min-h-[25px]">
                            <ErrorMessage name="privacityPolicy" component="p" className='text-[#ff0000]' />
                        </div>

                        <button type="submit" className='block mt-6 mx-auto py-3 px-10 text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg '>Enviar</button>
                    </Form>


                </Formik>


            </div>
        </>
    )
}