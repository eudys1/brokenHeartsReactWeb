import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const transporter = nodemailer.createTransport({
        // host: "smtp.email.com",
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: "gmail",
        auth: {
            user: "brokenheartsjerezbrand@gmail.com", // generated ethereal user
            pass: "x i f d l c z w d g d y i d z n", // generated ethereal password
        },
    });

    try {
        const body = JSON.parse(req.body);

        console.log("klk", body.email);

        // send mail with defined transport object
        await transporter.sendMail({
            // from: '"Fred Foo 👻" <brokenheartsjerezbrand@gmail.com>', // sender address
            // to: "eudysrosario01@gmail.com", // list of receivers
            // subject: "Contacta con nosotros, dudas", // Subject line
            // // text: "Hello world?", // plain text body
            // html: "<b>primera prueba enviando un email</b>", // html body

            from: `"${body.nombre} ${body.apellidos} 👻"<>`, // sender address
            to: `brokenheartsjerezbrand@gmail.com`, // list of receivers
            subject: "Contacta con nosotros, dudas", // Subject line
            // text: "Hello world?", // plain text body
            html:`<p> Nombre: ${body.nombre}, Apellidos: ${body.apellidos}, Email: ${body.email} <br/> Dudas:<${body.dudas}</p>`, // html body
        });

        res.status(200).json({ message: "ok" });
    } catch (error) {
        console.log("error", error);

    }

    // res.status(200);
}




