const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'GET') return methodNotAllowed('GET');

  try {
    const connection = await conn();
    const params = event.queryStringParameters || {};
    const page = Math.max(1, parseInt(params.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(params.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      connection.model('posts').find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      connection.model('posts').countDocuments({}),
    ]);

    return success({ data, pagination: { page, limit, total } });
  } catch (err) {
    return error(err.message);
  }
};
