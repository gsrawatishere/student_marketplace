import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,      // e.g., smtp.gmail.com
      port: process.env.SMTP_PORT,      // usually 587
      secure: false,                     // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,     // your email
        pass: process.env.SMTP_PASS,     // email app password or SMTP password
      },
    });

    // 2. Send mail
    const info = await transporter.sendMail({
      from: `"CampusKart" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};