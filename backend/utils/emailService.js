const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html = null) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as an email service
      auth: {
        user: process.env.EMAIL, // Sender's email address
        pass: process.env.EMAIL_PASSWORD, // Sender's app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to,                      // Recipient's email address
      subject,                 // Email subject
      text,                    // Plain text body
      html,                    // Optional: HTML version of the email
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;






// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL, // Your email address
//         pass: process.env.EMAIL_PASSWORD, // Your email password or App Password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL, // Sender's email address
//       to: email , // Recipient's email address
//       subject, // Subject of the email
//       text, // Plain text body of the email
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// module.exports = sendEmail;
