import db from '../../../lib/db';
import User from '../../../models/user';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const students = await User.find({ role: 'student' });

      res.status(200).json({ status: true, data: students });
    } catch (error) {
      res.status(500).json({ status: true, message: error });
    }
  } else {
    res.status(405).end();
  }
}
