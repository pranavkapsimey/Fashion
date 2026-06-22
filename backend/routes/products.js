import express from 'express';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Normalize the `sizes` field which arrives as JSON string or repeated fields
// from multipart form-data.
function parseSizes(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [raw];
  } catch {
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }
}

// GET /api/products  — public, supports ?category= and ?search=
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const filter = {};

  if (category && category !== 'All') filter.category = category;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// GET /api/products/:id  — public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch {
    res.status(400).json({ message: 'Invalid product id' });
  }
});

// POST /api/products  — admin only, multipart/form-data
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock, featured } = req.body;
    const product = await Product.create({
      name,
      description,
      price: Number(price) || 0,
      category,
      sizes: parseSizes(req.body.sizes),
      stock: Number(stock) || 0,
      featured: featured === 'true' || featured === true,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id  — admin only
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock, featured } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = Number(price);
    if (category !== undefined) update.category = category;
    if (stock !== undefined) update.stock = Number(stock);
    if (featured !== undefined) update.featured = featured === 'true' || featured === true;
    if (req.body.sizes !== undefined) update.sizes = parseSizes(req.body.sizes);
    if (req.file) update.image = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id  — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch {
    res.status(400).json({ message: 'Invalid product id' });
  }
});

export default router;
