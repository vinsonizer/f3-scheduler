const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

exports.getResult = async (asyncCallable) => {
  var result = null
  try {
    const output = await asyncCallable()
    result = wrapResponse(output)
  } catch (err) {
    console.log(`caught error: ${err}`)
    result = wrapError(err)
  }
  return result
}

function wrapResponse (result) {
  return { statusCode: 200, headers: headers, body: JSON.stringify(result) }
}

function wrapError (err) {
  return { statusCode: 500, headers: headers, body: JSON.stringify(err) }
}

exports.param = (input, key) => {
  return input.pathParameters[key]
}

exports.getInput = (event) => {
  return JSON.parse(event.body)
}
