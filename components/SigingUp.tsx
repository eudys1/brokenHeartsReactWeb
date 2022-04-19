import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import firebaseInit from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseInit);

const FormValidation = Yup.object().shape({
    nombre: Yup.string(),
    apellidos: Yup.string(),
    password: Yup.string().required("Introduce una contraceña"),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),

});


export default function SigingUp(className?: any) {

    const firestore = getFirestore(firebaseInit);
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState('');

    //create a new user
    async function userRegister(nombre: string, apellidos: string, email: string, password: string, rol: string = "client") {

        const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                const docRef = doc(firestore, `usuarios/${userInfo.uid}`);
                setDoc(docRef, { nombre: nombre, apellidos: apellidos, email: email, rol: rol });

                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/weak-password' && setError('La contraseña es muy débil (mínimo 6 carácteres');
                return errorCode; //?
            });

    }

    //Login a user
    async function signIn(auth: any, email: string, password: string) {

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/wrong-password' && setError('Contraseña incorrecta');
                errorCode === 'auth/user-not-found' && setError('Usuario no encontrado');    
            });
    }

    async function handleOnSubmit(userData: FormikValues) {
        // e.preventDefault();
        const nombre = userData.nombre;
        const apellidos = userData.apellidos;
        const email = userData.email;
        const password = userData.password;

        console.log("No api", userData);

        !isRegister ? userRegister(nombre, apellidos, email, password) : signIn(auth, email, password);

    }

    return (
        <>


            <div className={`w-[600px] mx-auto bg-white rounded-lg py-7 px-10 my-10 ${className}`}>
                <Formik
                    initialValues={{ nombre: "", apellidos: "", email: "", password: "" }}
                    onSubmit={handleOnSubmit}
                    validationSchema={FormValidation}
                >
                    <Form className='flex flex-col'>
                        <h1 className="text-2xl font-bold text-center my-3">{isRegister ? 'Iniciar sesión' : 'Crear cuenta'} </h1>

                        <p className='min-h-[24px] text-center text-[#ff0000]'>{error}</p>

                        {!isRegister &&
                            <>
                                <Field name="nombre" type="text" placeholder="Nombre" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                                <div className="min-h-[25px]">
                                    <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                                </div>

                                <Field name="apellidos" type="text" placeholder="Apellidos" className="w-full bg-[#e9f1fe] mb-[25px] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                            </>
                        }

                        <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        <div className="min-h-[25px]">
                            <ErrorMessage name="email" component="p" className='text-[#ff0000]' />
                        </div>

                        <Field name="password" type="password" placeholder="Contraceña *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                        <div className="min-h-[25px]">
                            <ErrorMessage name="password" component="p" className='text-[#ff0000]' />
                        </div>


                        <div className={`flex justify-around mt-5`}>

                            <button type='button' onClick={() => setIsRegister(!isRegister)} className={`block py-3 px-10 bg-white text-[#2286FF] border-2 border-transparent hover:border-[#2286FF] rounded-md `}> {!isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                            <button type="submit" className={` py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md `}>{isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                        </div>
                        {isRegister && <button type='button' className='w-fit mx-auto mt-5 py-3 px-10 bg-slate-100 hover:bg-slate-200 rounded-md'>Iniciar sesión con Google</button>}
                    </Form>


                </Formik>


            </div>
        </>
    )
}


