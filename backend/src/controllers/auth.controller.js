import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password, consentAccepted } = req.body;

    if (!email || !password || !consentAccepted) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    await User.create({
      email,
      passwordHash,
      consentAccepted,
      confirmationToken,
      isConfirmed: false,
    });

    console.log('CONFIRM TOKEN:', confirmationToken);

    res.status(201).json({
      message: 'Registro exitoso. Revisá tu mail para confirmar la cuenta',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};
