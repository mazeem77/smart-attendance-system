// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nfc: { type: Boolean, required: true, default: false },
  role: { type: String, enum: ['teacher', 'student'], required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
