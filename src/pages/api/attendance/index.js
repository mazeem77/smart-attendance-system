
import db from '../../../lib/db';
import Attendance from '../../../models/attendance';
import users from '../../../models/user';
import jwt from 'jsonwebtoken';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.body;
    if (action === 'mark') {
      try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ status: false, message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = req.body;
        const user = await users.findById(userId);
        if (!user) {
          return res.status(404).json({ status: false, message: 'user not found' });
        }

        const attendanceData = new Attendance({ userId });
        await attendanceData.save();

        res.status(201).json({ status: true, message: 'Attendance marked successfully' });
      } catch (error) {
        res.status(500).json({ status: false, message: error.message });
      }
    } else {
      res.status(400).json({ status: false, message: 'Invalid action' });
    }
  } else {
    res.status(405).end();
  }
}
