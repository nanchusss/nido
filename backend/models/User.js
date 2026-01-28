

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

confirmationTokenExpires: {
    type: Date,
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
});

export default mongoose.model('User', userSchema);
