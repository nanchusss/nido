

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
