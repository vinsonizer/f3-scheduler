// Include the AWS SDK module
const AWS = require('aws-sdk')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`event is ${JSON.stringify(event)}`)

  const input = JSON.parse(event.body)
  console.log(`input is ${input}`)

  const theId = input.id || context.awsRequestId

  const assignment = {
    id: theId,
    aoId: input.aoId,
    datetime: input.datetime,
    q: input.q,
    status: input.status
  }

  const params = {
    TableName: process.env.ASSIGNMENTS_TABLE,
    Key: {
      id: assignment.id
    },
    Item: assignment
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
      ao: ao
    })
  } catch (err) {
    response.statusCode = 500
    response.body = JSON.stringify(err)
  }
  return response
}