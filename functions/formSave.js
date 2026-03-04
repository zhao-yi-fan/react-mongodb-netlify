const { conn } = require('./db');
const { success, error, methodNotAllowed, preflight } = require('./utils/response');
const { authenticate } = require('./utils/auth');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'OPTIONS') return preflight();
  if (event.httpMethod !== 'POST') return methodNotAllowed('POST');

  const auth = authenticate(event);
  if (auth.error) return error(auth.error, 401);

  try {
    const body = JSON.parse(event.body || '{}');
    const { id, name, description, schema, previewImage } = body;

    if (!name) {
      return error('表单名称不能为空', 400);
    }
    if (!schema || !Array.isArray(schema) || schema.length === 0) {
      return error('表单配置不能为空', 400);
    }

    const connection = await conn();
    const Form = connection.model('forms');

    if (id) {
      const updated = await Form.findByIdAndUpdate(
        id,
        {
          name,
          description: description || '',
          schema,
          previewImage: previewImage || '',
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );
      if (!updated) return error('表单不存在', 404);
      return success({ data: updated });
    }

    const form = await Form.create({
      name,
      description: description || '',
      schema,
      previewImage: previewImage || '',
      createdBy: auth.user.username,
    });

    return success({ data: form });
  } catch (err) {
    return error(err.message);
  }
};
