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
      default: 'CLIENT',
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    confirmationToken: {
      type: String,
    },

    consentAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
