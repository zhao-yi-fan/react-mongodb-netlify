const { conn } = require('./db');
const bcrypt = require('bcryptjs');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');
const { generateToken } = require('./utils/auth');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return methodNotAllowed('POST');

  try {
    const body = JSON.parse(event.body || '{}');
    const { username, password } = body;

    if (!username || !password) {
      return error('用户名和密码不能为空', 400);
    }

    const connection = await conn();
    const User = connection.model('users');

    const user = await User.findOne({ username });
    if (!user) {
      return error('用户名或密码错误', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return error('用户名或密码错误', 401);
    }

    const token = generateToken({
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    return success({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return error(err.message);
  }
};
