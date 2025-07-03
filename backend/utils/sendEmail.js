// const nodemailer = require("nodemailer")

// const sendEmail = async (to, subject, html) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         })

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             html
//         }

//         await transporter.sendMail(mailOptions)
//     }
//     catch (err) {
//         console.error("Email send error:", err);
//     }
// }

// module.exports = sendEmail

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (err) {
        console.error("Email send error:", err);
        throw err;
    }
};

module.exports = sendEmail;
