import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  status: { type: Boolean, default: true },
  date: {
    type: Date,
    default: () => new Date().toJSON().slice(0, 7),
    unique: true,
  },

}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
