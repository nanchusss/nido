import bcrypt from 'bcryptjs';
import User from '../../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword, // ✅ COINCIDE CON EL MODELO
    });

    res.status(201).json({
      message: 'Registro exitoso',
    });

  } catch (error) {
  console.error('REGISTER ERROR 👉', error);
  res.status(500).json({
    message: 'Error en el registro',
    error: error.message,
  });
}

};


