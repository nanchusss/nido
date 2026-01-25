import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password, consentAccepted } = req.body;

    if (!email || !password || consentAccepted !== true) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      passwordHash,      // ✅ COINCIDE CON EL MODELO
      consentAccepted,   // ✅ COINCIDE CON EL MODELO
    });

    res.status(201).json({
      message: 'Registro exitoso',
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({
      message: 'Error en el registro',
      error: error.message,
    });
  }
};



