import type { NextApiRequest, NextApiResponse } from 'next'
import { transporter } from '../../mailer'


export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const body = JSON.parse(req.body);

        console.log("klk", body);

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <brokenheartsjerezbrand@gmail.com>', // sender address
            to: "eudysrosario01@gmail.com", // list of receivers
            subject: "Contacta con nosotros, dudas", // Subject line
            // text: "Hello world?", // plain text body
            html: "<b>primera prueba enviando un email</b>", // html body
        });

        res.status(200).json({ message: "ok" });
    } catch (error) {
        console.log("error", error);

    }

    // res.status(200);
}