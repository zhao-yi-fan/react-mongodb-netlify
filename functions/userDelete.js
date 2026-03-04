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
      return error('无效的用户 ID', 400);
    }

    if (auth.user.id === id) {
      return error('不能删除自己的账号', 400);
    }

    const connection = await conn();
    const User = connection.model('users');

    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return error('用户不存在', 404);
    }

    return success({ message: '删除成功' });
  } catch (err) {
    return error(err.message);
  }
};
