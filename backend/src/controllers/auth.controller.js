import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { sendEmail } from '../../utils/sendEmail.js';

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { email, password, consentAccepted, name } = req.body;

    if (!email || !password || consentAccepted !== true) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await User.create({
      email,
      name,
      passwordHash,
      consentAccepted,
      confirmationToken,
      confirmationTokenExpires,
      isConfirmed: false,
    });

    const confirmUrl = `${process.env.FRONT_URL}/verify?token=${confirmationToken}`;

    await sendEmail({
      to: email,
      subject: 'Confirmá tu cuenta',
      html: `
        <p>Confirmá tu cuenta haciendo click acá:</p>
        <a href="${confirmUrl}">Confirmar cuenta</a>
      `,
    });

    res.status(201).json({
      message: 'Registro exitoso. Revisá tu correo para confirmar la cuenta.',
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (!user.isConfirmed) {
      return res.status(403).json({ message: 'Cuenta no verificada' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { sub: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error en login' });
  }
};



