import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { firebaseInit } from '../firebase';
import { getAuth} from 'firebase/auth';
import { useUserAuth } from '../context/authContext';
import {FcGoogle} from 'react-icons/fc';

const auth = getAuth(firebaseInit);

const FormValidation = Yup.object().shape({
    nombre: Yup.string(),
    apellidos: Yup.string(),
    password: Yup.string().required("Introduce una contraceña"),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),

});


export default function Login(className?: any) {

    const [isRegister, setIsRegister] = useState(true);
    const {signUp, logIn, handleGoogleLogin, error, user}:any = useUserAuth();


    async function handleOnSubmit(userData: FormikValues) {
        // e.preventDefault();
        const nombre = userData.nombre;
        const apellidos = userData.apellidos;
        const email = userData.email;
        const password = userData.password;
        const profilePicture = userData.profilePicture;

        
        !isRegister ? await signUp(nombre, apellidos, email, password) : await logIn(auth, email, password);
        
        // console.log("No api", userData);
    }
    

    
    return (
        <>


            <div className={`mx-7 lg:w-[600px] lg:mx-auto bg-white rounded-lg py-7 px-10 my-10 flex flex-col ${className}`}>
                <Formik
                    initialValues={{ nombre: "", apellidos: "", email: "", password: "" }}
                    onSubmit={handleOnSubmit}
                    validationSchema={FormValidation}
                >
                    {/* {(formik) => {
                        const { errors, touched, isValid, dirty } = formik;
                        return ( */}
                    <Form className='flex flex-col'>
                        <h1 className="text-2xl font-bold text-center my-3">{isRegister ? 'Iniciar sesión' : 'Crear cuenta'} </h1>

                        <p className='min-h-[24px] text-center text-[#ff0000]'>{error}</p>

                        {!isRegister &&
                            <>
                                <Field name="nombre" type="text" placeholder="Nombre" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                                <div className="min-h-[25px]">
                                    <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                                    {/* {errors.nombre && touched.nombre && (<span className="text-[#ff0000]">{errors.nombre}</span>)} */}
                                </div>

                                <Field name="apellidos" type="text" placeholder="Apellidos" className="w-full bg-[#e9f1fe] mb-[25px] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                            </>
                        }

                        <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        <div className="min-h-[25px]">
                            <ErrorMessage name="email" component="p" className='text-[#ff0000]' />
                            {/* {errors.email && touched.email && (<span className="text-[#ff0000]">{errors.email}</span>)} */}

                        </div>

                        <Field name="password" type="password" placeholder="Contraceña *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        <div className="min-h-[25px]">
                            <ErrorMessage name="password" component="p" className='text-[#ff0000]' />
                            {/* {errors.password && touched.password && (<span className="text-[#ff0000]">{errors.password}</span>)} */}
                        </div>


                        <div className={`flex flex-col lg:flex-row gap-5 justify-around mt-5`}>

                            <button type='button' onClick={() => setIsRegister(!isRegister)} className={`lg:w-fit block py-3 px-10 bg-white text-[#2286FF] border-2 border-transparent hover:border-[#2286FF] rounded-md `}> {!isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                            <button type="submit" className={`py-3 px-10 lg:w-fit text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md `}>{isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                        </div>
                    </Form>

                </Formik>

                <a onClick={handleGoogleLogin} className='self-center flex items-center hover:cursor-pointer text-[#2286FF] hover:text-[#24599a] mt-8'>Iniciar sesión con <FcGoogle className='ml-4 'size={25}/></a>

            </div>
        </>
    )
}


