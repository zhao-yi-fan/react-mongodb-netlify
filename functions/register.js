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
    const { username, password, email } = body;

    if (!username || !password) {
      return error('用户名和密码不能为空', 400);
    }
    if (username.length < 2 || username.length > 20) {
      return error('用户名长度应为 2-20 个字符', 400);
    }
    if (password.length < 6) {
      return error('密码长度不能少于 6 个字符', 400);
    }

    const connection = await conn();
    const User = connection.model('users');

    const existing = await User.findOne({ username });
    if (existing) {
      return error('用户名已存在', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email: email || '',
      role: 'user',
    });

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
