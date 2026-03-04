const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'GET') return methodNotAllowed('GET');

  try {
    const connection = await conn();
    const Form = connection.model('forms');

    const forms = await Form.find({}).sort({ createdAt: -1 }).lean();

    return success({ data: forms });
  } catch (err) {
    return error(err.message);
  }
};
