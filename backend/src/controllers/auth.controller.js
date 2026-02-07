import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/User.js'
import { sendEmail } from '../../utils/sendEmail.js'

// =====================
// REGISTER
// =====================
export const register = async (req, res) => {
  try {
    const { email, password, consentAccepted, name } = req.body

    const verificationCode = Math.floor(10000 + Math.random() * 90000).toString()
    const verificationCodeExpires = new Date(Date.now() + 1000 * 60 * 10)

    const user = new User({
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: name || '',
      consentAccepted,
      verificationCode,
      verificationCodeExpires,
      isConfirmed: false,
    })

    await user.save()

    await sendEmail({
      to: email,
      subject: 'Confirmá tu cuenta en NIDO',
      html: `
        <h2>Confirmá tu correo</h2>
        <h1>${verificationCode}</h1>
        <p>Este código vence en 10 minutos.</p>
      `,
    })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Register failed' })
  }
}

// =====================
// LOGIN
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    if (!user.isConfirmed) {
      return res.status(403).json({ message: 'Cuenta no verificada' })
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
}

// =====================
// VERIFY CODE
// =====================
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body

    const user = await User.findOne({
      email,
      verificationCode: code.toString().trim(),
      verificationCodeExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Código inválido o expirado' })
    }

    user.isConfirmed = true
    user.verificationCode = null
    user.verificationCodeExpires = null
    await user.save()

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Verify failed' })
  }
}
// =====================
// ME (JWT)
// =====================
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
}