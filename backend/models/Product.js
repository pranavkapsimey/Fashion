import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Men', 'Women', 'Kids', 'Accessories'],
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL'],
      default: [],
    },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' }, // relative path served from /uploads
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
