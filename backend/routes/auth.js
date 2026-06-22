import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// A single hardcoded admin user. The password is hashed once at startup so we
// can compare against it with bcrypt, mirroring a real persisted user.
const adminEmail = process.env.ADMIN_EMAIL || 'admin@fashionstore.com';
const adminPasswordHash = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD || 'admin123',
  10
);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = bcrypt.compareSync(password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email: adminEmail, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { email: adminEmail, role: 'admin' } });
});

export default router;
