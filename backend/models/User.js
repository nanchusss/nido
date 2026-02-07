import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  role: {
    type: String,
    default: 'CLIENT',
  },

  consentAccepted: {
    type: Boolean,
    required: true,
  },

  // 🔹 Verificación por código (nuevo)
  verificationCode: {
    type: String,
  },

  verificationCodeExpires: {
    type: Date,
  },

  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('User', userSchema);
