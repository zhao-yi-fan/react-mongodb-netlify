const { conn } = require('./db');
const mongoose = require('mongoose');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');
const { authenticate } = require('./utils/auth');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'DELETE') return methodNotAllowed('DELETE');

  const auth = authenticate(event);
  if (auth.error) return error(auth.error, 401);

  try {
    const params = event.queryStringParameters || {};
    const id = params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return error('无效的表单 ID', 400);
    }

    const connection = await conn();
    const Form = connection.model('forms');

    const result = await Form.findByIdAndDelete(id);
    if (!result) {
      return error('表单不存在', 404);
    }

    return success({ message: '删除成功' });
  } catch (err) {
    return error(err.message);
  }
};
