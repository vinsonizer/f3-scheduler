// Include the AWS SDK module
const AWS = require('aws-sdk')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`event is ${JSON.stringify(event)}`)

  const input = JSON.parse(event.body)
  console.log(`input is ${input}`)

  const theId = input.id || context.awsRequestId

  const pax = {
    id: theId,
    paxName: input.paxName,
    regionName: input.regionName,
    firstName: input.firstName,
    lastName: input.lastName
  }

  const params = {
    TableName: process.env.PAX_TABLE,
    Key: {
      paxName: pax.paxName
    },
    Item: pax
  }

  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
  try {
    await dynamodb.put(params).promise()
    response.statusCode = 200
    response.body = JSON.stringify({
      pax: pax
    })
  } catch (err) {
    response.statusCode = 500
    response.body = JSON.stringify(err)
  }
  return response
}
