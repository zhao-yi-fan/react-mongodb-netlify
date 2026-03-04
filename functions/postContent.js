const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return methodNotAllowed('POST');

  try {
    if (!event.body) {
      return error('Request body is required', 400);
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return error('Invalid JSON in request body', 400);
    }

    const { title, description, contents, createTime } = body;
    if (!title || !contents) {
      return error('title and contents are required', 400);
    }

    const connection = await conn();
    const doc = await connection.model('posts').create({
      title,
      description: description || '',
      contents,
      createTime: createTime || new Date().toISOString(),
    });

    return success({ data: doc._id }, 201);
  } catch (err) {
    return error(err.message);
  }
};
