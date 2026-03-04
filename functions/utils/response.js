const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
};

function success(data, statusCode = 200) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

function error(message, statusCode = 500) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: message }),
  };
}

function methodNotAllowed(allowed = 'GET') {
  return {
    statusCode: 405,
    headers: { ...CORS_HEADERS, Allow: allowed },
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
}

function preflight() {
  return { statusCode: 204, headers: CORS_HEADERS, body: '' };
}

module.exports = { success, error, methodNotAllowed, preflight, CORS_HEADERS };
