const mongoose = require('mongoose');

let cachedConnection = null;

exports.conn = async function () {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const uri = 'mongodb+srv://superadmin:cGg9D9YwbY4mQke@cluster0.mwyghg.mongodb.net/my_asg3_db';

  cachedConnection = await mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    contents: String,
    createTime: String,
  });

  cachedConnection.model('posts', postSchema);

  cachedConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    cachedConnection = null;
  });

  cachedConnection.on('disconnected', () => {
    cachedConnection = null;
  });

  return cachedConnection;
};
