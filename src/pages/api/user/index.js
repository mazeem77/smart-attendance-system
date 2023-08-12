import db from '../../../lib/db';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.action === 'signup') {
      try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          username,
          email,
          password: hashedPassword,
          role
        });

        console.log(user)

        await user.save();
        res.status(201).json({ status: true, message: 'User signed up successfully' });
      } catch (error) {
        res.status(400).json({ status: false, message: error.message });
      }
    }
    else if (req.body.action === 'signin') {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
          return res.status(404).json({ status: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ status: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: true, token });
      } catch (error) {
        res.status(500).json({ status: false, message: error.message });
      }
    } else {
      res.status(400).json({ status: false, message: 'Invalid action' });
    }
  }
  else if (req.method === 'GET') {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }

      res.status(200).json({ status: true, data: user });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }

  else {
    res.status(405).end();
  }
}
