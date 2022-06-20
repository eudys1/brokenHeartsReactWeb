import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import * as Yup from 'yup';

const FormValidation = Yup.object().shape({
    nombre: Yup.string().required("Introduce un nombre"),
    apellidos: Yup.string(),
    dudas: Yup.string(),
    email: Yup.string().email("Introduce un email válido").required("Introduce un email"),
    privacityPolicy: Yup.boolean().oneOf([true], 'Debes aceptar las políticas de privacidad').required(),

});



export default function Contact() {
    const [isSend, setIsSend] = useState(false);

    async function handleOnSubmit(e: FormikValues) {
        setIsSend(true);
        const allContactData = e;

        await fetch('/api/mail', {
            method: 'POST',
            body: JSON.stringify(allContactData),
        }).then(res => res.json())

        console.log("No api", allContactData);

        //reset form values
        (document.getElementById('contact-form') as HTMLFormElement).reset();

    }

    return (

        <div className=" mx-auto bg-white rounded-lg py-7 px-10 ">
            <Formik
                initialValues={{ nombre: "", apellidos: "", email: "", dudas: "", privacityPolicy: false }}
                onSubmit={handleOnSubmit}
                validationSchema={FormValidation}
            >
                {/* {(formik) => {
                        const { errors, touched, isValid, dirty } = formik;
                        return ( */}
                <Form id='contact-form'>

                    <Field name="nombre" type="text" placeholder="Nombre *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />

                    <div className="min-h-[25px]">
                        <ErrorMessage name="nombre" component="p" className='text-[#ff0000]' />
                        {/* {errors.nombre && touched.nombre && (<span className="text-[#ff0000]">{errors.nombre}</span>)} */}
                    </div>

                    <Field name="apellidos" type="text" placeholder="Apellidos" className="w-full bg-[#e9f1fe] mb-[25px] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />

                    <Field name="email" type="email" placeholder="Email *" className="w-full bg-[#e9f1fe] mt-3 p-4 rounded-md  focus:border-[#2286FF] " />
                    <div className="min-h-[25px]">
                        <ErrorMessage name="email" component="p" className='text-[#ff0000]' />
                        {/* {errors.email && touched.email && (<span className="text-[#ff0000]">{errors.email}</span>)} */}
                    </div>

                    <label htmlFor='dudas' className='block text-[#f56c95] mt-3 font-semibold'>Déjanos tus preguntas:</label>
                    <Field name="dudas" id="dudas" as="textarea" placeholder="Escribe tu duda" rows="4" className="w-full bg-[#e9f1fe] my-3 p-4 rounded-md  focus:border-[#2286FF]" />

                    <label className='block '>
                        <Field name="privacityPolicy" type="checkbox" />
                        He leído y acepto la <a href="" className='text-[#f56c95] font-semibold'>políticas de privacidad.</a>
                    </label>
                    <div className="min-h-[25px]">
                        <ErrorMessage name="privacityPolicy" component="p" className='text-[#ff0000]' />
                        {/* {errors.privacityPolicy && touched.privacityPolicy && (<span className="text-[#ff0000]">{errors.privacityPolicy}</span>)} */}
                    </div>

                    <button disabled={isSend} type="submit" className={`block mt-6 mx-auto py-3 px-10 text-white rounded-lg  ${isSend ? 'bg-green-600' : 'bg-[#2286FF] hover:bg-[#24599a]'}   `}>
                        {isSend ?
                            <div className="flex items-center gap-3">
                                <span>Enviado</span>
                                <TiTick size={25}/>
                            </div>
                            : "Enviar"
                        }
                    </button>
                </Form>
                {/* );
                    }} */}

            </Formik>

        </div>

    )
}