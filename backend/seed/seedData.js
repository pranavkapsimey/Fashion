// Sample catalogue seeded on every server start (in-memory DB starts empty).
// Images use remote Unsplash URLs so no local files are required for the seed.
export const sampleProducts = [
  {
    name: 'Tailored Wool Overcoat',
    description:
      'A timeless single-breasted overcoat cut from Italian wool. Structured shoulders and a clean silhouette for effortless winter elegance.',
    price: 389,
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 24,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Silk Slip Dress',
    description:
      'Bias-cut silk slip dress in a muted champagne tone. Fluid drape with adjustable straps — understated evening luxury.',
    price: 245,
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 18,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cashmere Crewneck Sweater',
    description:
      'Pure grade-A cashmere knit in soft ivory. Lightweight warmth with a relaxed, refined fit.',
    price: 198,
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 30,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Structured Leather Tote',
    description:
      'Full-grain leather tote with a minimal hardware finish. Spacious enough for the everyday, elegant enough for the boardroom.',
    price: 320,
    category: 'Accessories',
    sizes: [],
    stock: 12,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Linen Resort Shirt',
    description:
      'Breathable European linen shirt with a camp collar. Relaxed cut, perfect for warm-weather escapes.',
    price: 135,
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'High-Waist Tailored Trousers',
    description:
      'Sharp, high-waisted trousers with a subtle pleat and tapered leg. Crafted from a wool-blend with quiet stretch.',
    price: 175,
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kids Knit Cardigan',
    description:
      'Soft cotton-blend cardigan for little ones. Wooden buttons and a cozy ribbed trim in oatmeal.',
    price: 68,
    category: 'Kids',
    sizes: ['XS', 'S', 'M'],
    stock: 35,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Minimalist Leather Watch',
    description:
      'Swiss quartz movement, sapphire crystal, and a slim leather strap. Quiet sophistication on the wrist.',
    price: 280,
    category: 'Accessories',
    sizes: [],
    stock: 15,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Oversized Trench Coat',
    description:
      'A modern take on the classic trench — oversized, double-breasted, in a sand cotton gabardine.',
    price: 295,
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    stock: 16,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Merino Wool Scarf',
    description:
      'Featherweight merino wool scarf in charcoal. The finishing touch to any cold-weather look.',
    price: 89,
    category: 'Accessories',
    sizes: [],
    stock: 50,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1457545195570-67f207084966?auto=format&fit=crop&w=800&q=80',
  },
];

export const sampleOrders = [
  {
    customer: { name: 'Eleanor Vance', address: '14 Mayfair Lane, London', email: 'eleanor@example.com' },
    items: [{ name: 'Silk Slip Dress', price: 245, size: 'S', quantity: 1 }],
    total: 245,
    status: 'Delivered',
  },
  {
    customer: { name: 'Marcus Reed', address: '88 Hudson St, New York', email: 'marcus@example.com' },
    items: [
      { name: 'Tailored Wool Overcoat', price: 389, size: 'L', quantity: 1 },
      { name: 'Merino Wool Scarf', price: 89, size: '', quantity: 1 },
    ],
    total: 478,
    status: 'Shipped',
  },
  {
    customer: { name: 'Aiko Tanaka', address: '3 Sakura Ave, Tokyo', email: 'aiko@example.com' },
    items: [{ name: 'Structured Leather Tote', price: 320, size: '', quantity: 1 }],
    total: 320,
    status: 'Pending',
  },
];
