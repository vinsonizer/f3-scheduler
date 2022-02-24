const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

exports.getResult = async (asyncCallable) => {
  var result = null;
  try {
    const output = await asyncCallable();
    result = wrapResponse(output);
  } catch (err) {
    console.log(`caught error: ${err}`);
    result = wrapError(err);
  }
  return result;
};

function wrapResponse(result) {
  return wrap(200, result);
}

function wrapError(err) {
  return wrap(500, err);
}

function wrap(code, body) {
  return { statusCode: code, headers: headers, body: JSON.stringify(body) };
}

exports.param = (input, key) => {
  return input.pathParameters[key];
};

exports.getInput = (event) => {
  return JSON.parse(event.body);
};
