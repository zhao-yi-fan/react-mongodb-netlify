const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');
const { authenticate } = require('./utils/auth');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'GET') return methodNotAllowed('GET');

  const auth = authenticate(event);
  if (auth.error) return error(auth.error, 401);

  try {
    const connection = await conn();
    const User = connection.model('users');

    const users = await User.find({}, '-password').sort({ createdAt: -1 }).lean();

    return success({ data: users });
  } catch (err) {
    return error(err.message);
  }
};
