// pages/api/index.js
import db from '../../lib/db';

export default function handler(req, res) {
  res.status(200).json({ message: 'API is working' });
}
