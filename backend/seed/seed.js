import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { sampleProducts, sampleOrders } from './seedData.js';

// Populate the in-memory database. Runs on every start since the DB is empty.
export async function seedDatabase() {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);
  }

  const orderCount = await Order.countDocuments();
  if (orderCount === 0) {
    await Order.insertMany(sampleOrders);
    console.log(`Seeded ${sampleOrders.length} orders`);
  }
}
