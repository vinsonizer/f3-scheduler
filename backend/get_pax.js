// Include the AWS SDK module
const AWS = require('aws-sdk')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.getAll = async (event, context) => {
  const params = {
    TableName: process.env.PAX_TABLE
  }

  const result = await dynamodb.scan(params).promise()

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      pax: result.Items
    })
  }
  return response
}

exports.getById = async (event, context) => {
  const params = {
    TableName: process.env.PAX_TABLE,
    Key: {
      regionId: event.pathParameters.regionId,
      paxId: event.pathParameters.paxId
    }
  }

  const result = await dynamodb.get(params).promise()
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(result.Item, null, 2)
  }
  return response
}