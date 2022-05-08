const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    // host: "smtp.email.com",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "brokenheartsjerezbrand@gmail.com", // generated ethereal user
        pass: "x i f d l c z w d g d y i d z n", // generated ethereal password
    },
});