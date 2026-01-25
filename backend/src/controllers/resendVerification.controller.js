import crypto from 'crypto';
import User from '../../models/User.js';
import { sendEmail } from '../../utils/sendEmail.js';

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email requerido' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.isConfirmed) {
      return res.status(400).json({ message: 'La cuenta ya está confirmada' });
    }

    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.confirmationToken = confirmationToken;
    user.confirmationTokenExpires = confirmationTokenExpires;
    await user.save();

    const confirmUrl = `${process.env.FRONT_URL}/verify?token=${confirmationToken}`;

    await sendEmail({
      to: email,
      subject: 'Confirmá tu cuenta',
      html: `
        <p>Confirmá tu cuenta haciendo click acá:</p>
        <a href="${confirmUrl}">Confirmar cuenta</a>
      `,
    });

    res.json({ message: 'Email de verificación reenviado' });

  } catch (error) {
    res.status(500).json({ message: 'Error al reenviar verificación' });
  }
};
