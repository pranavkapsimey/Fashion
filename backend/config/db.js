import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Connect Mongoose to a database.
// - If MONGODB_URI is set (e.g. a MongoDB Atlas connection string), use it.
//   This is the recommended path for production: data persists across restarts.
// - Otherwise spin up an in-memory MongoDB so local dev needs no DB install.
//   The binary version is pinned to 7.0.x because newer Linux distros (e.g.
//   Render's Debian 12) have no binaries for the older default.
export async function connectDB() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB via MONGODB_URI');
    return process.env.MONGODB_URI;
  }

  mongoServer = await MongoMemoryServer.create({
    binary: { version: process.env.MONGOMS_VERSION || '7.0.14' },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log(`In-memory MongoDB started at ${uri}`);
  return uri;
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}
