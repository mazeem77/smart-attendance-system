import mongoose from 'mongoose';

const nfcSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  serialNumber: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.NFC || mongoose.model('NFC', nfcSchema);
