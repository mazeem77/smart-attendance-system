import db from '../../../lib/db';
import Class from '../../../models/class';
import User from '../../../models/user';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  const { classId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { studentId } = req.body;

      const classToUpdate = await Class.findById(classId);
      if (!classToUpdate) {
        return res.status(404).json({ message: 'Class not found' });
      }

      const student = await User.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      if (!classToUpdate.students.includes(studentId)) {
        classToUpdate.students.push(studentId);
        await classToUpdate.save();
        res.status(200).json({ message: 'Student added to class successfully' });
      } else {
        res.status(200).json({ message: 'Student already exists in the class' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === 'GET') {
    try {
      const classToGet = await Class.findById(classId);
      if (!classToGet) {
        return res.status(404).json({ message: 'Class not found' });
      }

      const students = await User.find({ _id: { $in: classToGet.students } });
      res.status(200).json({ status: true, data: students });
    }
    catch (error) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(405).end();
  }
}
