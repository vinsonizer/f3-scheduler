// Include the AWS SDK module
const AWS = require('aws-sdk')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  const pax = {
    paxName    : event.body.paxName,
    regionName : event.body.regionName,
    firstName  : event.body.firstName,
    lastName   : event.body.lastName
  }

  const params = {
    TableName: process.env.PAX_TABLE,
    Key: {
      paxName: pax.paxName
    },
    Item: pax
  }

  const result = await dynamodb.put(params).promise()
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      pax: pax
    })
  }
  return response
}
