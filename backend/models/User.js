import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['USER', 'CLIENT', 'ADMIN'],
      default: 'USER',
    },

    consentAccepted: {
      type: Boolean,
      required: true,
    },

    confirmationToken: {
      type: String,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
