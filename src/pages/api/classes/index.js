import db from '../../../lib/db';
import Class from '../../../models/class';
import User from '../../../models/user';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, teacher } = req.body;
      console.log(name, teacher)
      let className = name
      const newClass = await Class.create({ className, teacher });
      const user = await User.findById({ _id: teacher });
      user.class = true;
      await user.save();
      res.status(201).json({ status: true, data: newClass });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  } else if (req.method === 'GET') {
    try {
      const { teacher } = req.query;
      const classes = await Class.find({ teacher });
      res.status(200).json({ status: true, data: classes });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  } else {
    res.status(405).end();
  }
}
