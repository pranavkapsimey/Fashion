import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Spin up an in-memory MongoDB instance and connect Mongoose to it.
// This avoids requiring a separate database installation for development.
export async function connectDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log(`In-memory MongoDB started at ${uri}`);
  return uri;
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}
