import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  className: { type: String, required: true },
});

export default mongoose.models.Class || mongoose.model('Class', classSchema);
