// Include the AWS SDK module
const AWS = require('aws-sdk')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.get = async (params) => {
  var result = await dynamodb.get(params).promise()
  return result.Item
}

exports.scan = async (params) => {
  var result = await dynamodb.scan(params).promise()
  return result.Items
}

exports.put = async (params) => {
  console.log(`query for ${JSON.stringify(params, null, 2)}`)
  var result = await dynamodb.put(params).promise()
  console.log(`query returned ${JSON.stringify(result, null, 2)}`)
  return result
}

exports.query = async (params) => {
  var result = await dynamodb.query(params).promise()
  return result.Items
}
