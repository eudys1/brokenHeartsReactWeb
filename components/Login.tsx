import Head from 'next/head'
import Header from "../components/Header";
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import SigingUp from './SigingUp';


const FormValidation = Yup.object().shape({

    password: Yup.string().required("Introduce una contraceña"),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),

});


export default function Login(className?: any) {

    async function handleOnSubmit(e: FormikValues) {
        // e.preventDefault();
        const allContactData = e;

        // await fetch('/api/mail', {
        //     method: 'POST',
        //     body: JSON.stringify(allContactData),
        // })

        console.log("No api", allContactData);

    }

    return (
        <>

            <div className={`w-[600px] mx-auto bg-white rounded-lg py-7 px-10 my-10 ${className}`}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleOnSubmit}
                    validationSchema={FormValidation}
                >
                    {(formik) => {
                        const { errors, touched, isValid, dirty } = formik;
                        return (
                            <Form>
                                <h1 className="text-2xl font-bold text-center my-3">Iniciar sesión</h1>

                                <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                                <div className="min-h-[25px]">
                                    {/* <ErrorMessage name="email" component="p" className='text-[#ff0000]' /> */}
                                    {errors.email && touched.email && (<span className="text-[#ff0000]">{errors.email}</span>)}

                                </div>

                                <Field name="password" type="password" placeholder="Contraceña *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                                <div className="min-h-[25px]">
                                    {/* <ErrorMessage name="password" component="p" className='text-[#ff0000]' /> */}
                                    {errors.password && touched.password && (<span className="text-[#ff0000]">{errors.password}</span>)}

                                </div>

                                {/* 
                        <a href="/SigingUp" className='block mt-10 mx-auto py-3 px-10 bg-white text-[#2286FF] hover:border-2 hover:border-[#2286FF] rounded-lg '>
                            Crear cuenta
                        </a> */}

                                <button type="submit" className='block mt-10 mx-auto py-3 px-10 text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg '>Iniciar sesión</button>
                            </Form>
                        );
                    }}
                </Formik>

            </div>

            <SigingUp />
        </>
    )
}