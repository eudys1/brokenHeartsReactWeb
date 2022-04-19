// import Head from 'next/head'
// import Header from "../components/Header";
// import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikValues } from 'formik';
// import * as Yup from 'yup';
// import SigingUp from './SigingUp';
// import { useState } from "react";


// const FormValidation = Yup.object().shape({

//     password: Yup.string().required("Introduce una contraceña"),
//     email: Yup.string().email("Introduce un email válido").required("Introduce un email"),

// });


// export default function Sigingin(className?: any) {
//     const [isLogin, setIsLogin] = useState(true);

//     async function handleOnSubmit(e: FormikValues) {
//         // e.preventDefault();
//         const allContactData = e;

//         // await fetch('/api/mail', {
//         //     method: 'POST',
//         //     body: JSON.stringify(allContactData),
//         // })

//         console.log("No api", allContactData);

//     }

//     return (
//         <>

//             <div className={`w-[600px] mx-auto bg-white rounded-lg py-7 px-10 my-10 ${className}`}>
//                 <Formik
//                     initialValues={{ email: "", password: "" }}
//                     onSubmit={handleOnSubmit}
//                     validationSchema={FormValidation}
//                 >
//                     <Form>
//                         <h1 className="text-2xl font-bold text-center my-3">Iniciar sesión</h1>

//                         <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
//                         <div className="min-h-[25px]">
//                             <ErrorMessage name="email" component="p" className='text-[#ff0000]' />
//                         </div>

//                         <Field name="password" type="password" placeholder="Contraceña *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
//                         <div className="min-h-[25px]">
//                             <ErrorMessage name="password" component="p" className='text-[#ff0000]' />
//                         </div>

//                         {/* 
//                         <a href="/SigingUp" className='block mt-10 mx-auto py-3 px-10 bg-white text-[#2286FF] hover:border-2 hover:border-[#2286FF] rounded-lg '>
//                             Crear cuenta
//                         </a> */}

//                         <button type="submit" className='block mt-10 mx-auto py-3 px-10 text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg '>Iniciar sesión</button>
//                     </Form>

//                 </Formik>

//             </div>

//             <SigingUp />
//         </>
//     )
// }