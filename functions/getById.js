const mongoose = require('mongoose');
const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'GET') return methodNotAllowed('GET');

  try {
    const params = event.queryStringParameters || {};
    const { id } = params;

    if (!id) {
      return error('Query parameter "id" is required', 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return error('Invalid ObjectId format', 400);
    }

    const connection = await conn();
    const doc = await connection.model('posts').findById(id);

    if (!doc) {
      return error('Post not found', 404);
    }

    return success({ data: doc });
  } catch (err) {
    return error(err.message);
  }
};
