import express from 'express';
import Order from '../models/Order.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders  — admin only
router.get('/', requireAuth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// POST /api/orders  — public (place an order)
router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer?.name || !customer?.address) {
      return res.status(400).json({ message: 'Customer name and address are required' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const order = await Order.create({
      customer,
      items,
      total: Number(total) || 0,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status  — admin only (update fulfilment status)
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
