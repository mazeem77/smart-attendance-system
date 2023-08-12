import db from '../../../lib/db';
import users from '../../../models/user';
import NFC from '../../../models/nfc';
import jwt from 'jsonwebtoken';

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.body;

    if (action === 'register') {
      try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log("Registering")

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await users.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const { serialNumber } = req.body;
        console.log(serialNumber)
        const nfcData = new NFC({ userId, serialNumber });
        await nfcData.save();
        user.nfc = true;
        await user.save();

        res.status(201).json({ message: 'NFC data registered successfully' });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (action === 'verify') {
      try {
        const { serialNumber } = req.body;
        const nfcData = await NFC.findOne({ serialNumber });

        if (!nfcData) {
          return res.status(404).json({ message: 'NFC data not found' });
        }

        const userId = nfcData.userId;
        const user = await users.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.status(405).end();
  }
}
