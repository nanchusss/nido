import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
  try {

        const smtpPort = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : 587;

    if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
      throw new Error('SMTP_PORT inválido o no definido');
    }

    const smtpSecure =
      process.env.SMTP_SECURE === 'true' || smtpPort === 465;

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      throw new Error('Faltan variables SMTP_HOST/SMTP_USER/SMTP_PASS');
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      
      auth: {
       user: smtpUser,
        pass: smtpPass,
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
