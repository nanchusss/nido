import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Nido" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    // 🔥 LOG CLARO
    console.log('📧 Email enviado correctamente');
    console.log('   → To:', to);
    console.log('   → MessageId:', info.messageId);

    return info;

  } catch (error) {
    console.error('❌ Error enviando email');
    console.error('   → To:', to);
    console.error('   → Error:', error.message);

    throw error; // importante
  }
};
