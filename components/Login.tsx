import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { firebaseInit } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


interface saveUserInFirestorageProps {
    userUid: React.ReactNode;
    nombre?: React.ReactNode;
    apellidos?: React.ReactNode;
    email?: React.ReactNode;
    rol?: React.ReactNode;
}


const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseInit);

const FormValidation = Yup.object().shape({
    nombre: Yup.string(),
    apellidos: Yup.string(),
    password: Yup.string().required("Introduce una contraceña"),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),

});

//TODO: improve  function saveUserInFirestorage

export default function Login(className?: any) {

    const firestore = getFirestore(firebaseInit);
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState('');

    function saveUserInFirestorage({userUid="",nombre="",apellidos="",email="",rol="client"}: saveUserInFirestorageProps) {
        
        //save user in firestore:
        const docRef = doc(firestore, `usuarios/${userUid}`);
        setDoc(docRef, { nombre: nombre, apellidos: apellidos, email: email, rol: rol });
    }


    //create a new user
    async function userRegister(nombre: string, apellidos: string, email: string, password: string, rol = "client") {

        const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                //TODO:use function saveUserInFirestorage here
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

    //FIXME: google auth when is a new user 
    //Login a user with google
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) return;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user);

                saveUserInFirestorage({ userUid:user.uid, nombre:user.displayName, email:user.email, rol:"client" });
                

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);

                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.email;
                console.log(email);

                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
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


            <div className={`w-[600px] mx-auto bg-white rounded-lg py-7 px-10 my-10 flex flex-col ${className}`}>
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


                        <div className={`flex justify-around mt-5`}>

                            <button type='button' onClick={() => setIsRegister(!isRegister)} className={`block py-3 px-10 bg-white text-[#2286FF] border-2 border-transparent hover:border-[#2286FF] rounded-md `}> {!isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                            <button type="submit" className={` py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-md `}>{isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
                        </div>
                    </Form>
                    {/* );
                    }} */}

                </Formik>

                <a onClick={handleGoogleLogin} className='self-center hover:cursor-pointer text-[#2286FF] hover:text-[#24599a] mt-8'>Iniciar sesión con Google</a>

            </div>
        </>
    )
}


