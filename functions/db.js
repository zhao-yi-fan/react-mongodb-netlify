const mongoose = require('mongoose');

let cachedConnection = null;

exports.conn = async function () {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const uri = 'mongodb+srv://superadmin:cGg9D9YwbY4mQke@cluster0.nwnyghg.mongodb.net/my_asg3_db';

  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  });

  conn.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    cachedConnection = null;
  });

  conn.on('disconnected', () => {
    cachedConnection = null;
  });

  await conn.asPromise();

  conn.model('posts', new mongoose.Schema({
    title: String,
    description: String,
    contents: String,
    createTime: String,
  }));

  conn.model('users', new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, default: '' },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    createdAt: { type: String, default: () => new Date().toISOString() },
  }));

  conn.model('forms', new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    schema: { type: mongoose.Schema.Types.Mixed, default: [] },
    previewImage: { type: String, default: '' },
    createdBy: { type: String, default: '' },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() },
  }));

  cachedConnection = conn;
  return cachedConnection;
};
