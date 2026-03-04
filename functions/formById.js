const { conn } = require('./db');
const mongoose = require('mongoose');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'GET') return methodNotAllowed('GET');

  try {
    const params = event.queryStringParameters || {};
    const id = params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return error('无效的表单 ID', 400);
    }

    const connection = await conn();
    const Form = connection.model('forms');

    const form = await Form.findById(id).lean();
    if (!form) {
      return error('表单不存在', 404);
    }

    return success({ data: form });
  } catch (err) {
    return error(err.message);
  }
};
