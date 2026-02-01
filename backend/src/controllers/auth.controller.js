import crypto from 'crypto'
import User from '../../models/User.js'
import { sendEmail } from '../../utils/sendEmail.js'

// =====================
// REGISTER
// =====================
export const register = async (req, res) => {
  try {
    console.log('🟢 REGISTER HIT')
    console.log('BODY:', req.body)

    const { email, password, consentAccepted, name } = req.body

    const confirmationToken = crypto.randomBytes(32).toString('hex')

    const user = new User({
      email,
      passwordHash: password, // luego se hashea
      name: name || '',
      consentAccepted,
      confirmationToken,
      confirmationTokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isConfirmed: false,
    })

    await user.save()
    console.log('✅ USUARIO GUARDADO EN MONGO')

    const confirmUrl = `${process.env.FRONT_URL}/verify/${confirmationToken}`

    await sendEmail({
      to: email,
      subject: 'Confirmá tu cuenta en NIDO',
      html: `
        <h2>Confirmá tu correo</h2>
        <p>Hacé click en el siguiente link:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
      `,
    })

    console.log('📧 EMAIL ENVIADO')

    return res.json({ success: true })
  } catch (error) {
    console.error('❌ REGISTER ERROR:', error)
    return res.status(500).json({ error: 'Register failed' })
  }
}

// =====================
// LOGIN (MOCK)
// =====================
export const login = async (req, res) => {
  return res.status(200).json({
    message: 'Login OK (mock)',
  })
}

// =====================
// ME
// =====================
export const me = async (req, res) => {
  return res.status(200).json({
    user: {
      id: 'mock-id',
      email: 'mock@email.com',
      role: 'CLIENT',
    },
  })
}

// =====================
// VERIFY EMAIL
// =====================
export const verify = async (req, res) => {
  try {
    const { token } = req.params

    const user = await User.findOne({
      confirmationToken: token,
      confirmationTokenExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' })
    }

    user.isConfirmed = true
    user.confirmationToken = undefined
    user.confirmationTokenExpires = undefined

    await user.save()

    return res.json({ message: 'Cuenta confirmada correctamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' })
  }
}
