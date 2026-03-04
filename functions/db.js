const mongoose = require('mongoose');

let cachedConnection = null;

exports.conn = async function () {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const uri = 'mongodb+srv://superadmin:cGg9D9YwbY4mQke@cluster0.mwyghg.mongodb.net/my_asg3_db';

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

  cachedConnection = conn;
  return cachedConnection;
};
