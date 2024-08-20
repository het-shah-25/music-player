const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, fullName, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
</head>
<body style="background-color: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; height: 100vh; display: flex; align-items: center; justify-content: center;">
    <table style="width: 100%; max-width: 600px; margin: 10px; border-collapse: collapse;">
        <tr>
            <td style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 40px; text-align: center;">
                <img src="https://dummyimage.com/200x50/000/fff&text=Your+Logo" alt="Your Logo" style="width: 200px; margin-bottom: 20px;">
                <h1 style="font-size: 24px; color: #333; margin-top: 0; margin-bottom: 20px;">Hello, ${fullName}!</h1>
                <div style="background-color: #007bff; color: #ffffff; padding: 20px; border-radius: 8px;">
                    <h2 style="font-size: 20px; margin: 0; margin-bottom: 10px;">Your One-Time Password (OTP)</h2>
                    <p style="margin-top: 0; margin-bottom: 20px;">Please use the following password to complete your login process:</p>
                    <div style="background-color: #ffffff; color: #007bff; padding: 10px; border-radius: 8px; font-size: 18px; letter-spacing: 2px;">
                        ${otp}
                    </div>
                </div>
                <p style="color: #666; margin-top: 20px;">This OTP is valid for 10 minutes and for one-time use only.</p>
                <div style="background-color: #f1f1f1; padding: 20px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
                    © 2024 Your Company. All rights reserved.
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email not sent!", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = { sendEmail };
