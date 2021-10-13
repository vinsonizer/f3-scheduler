// Include the AWS SDK module
const AWS = require('aws-sdk')

// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`event is ${JSON.stringify(event)}`)

  const input = JSON.parse(event.body)
  console.log(`input is ${input}`)

  const aoId = event.pathParameters.aoId

  const assignment = {
    aoId: aoId,
    timestamp: input.timestamp,
    assignmentStatus: input.assignmentStatus
  }

  const params = {
    TableName: process.env.ASSIGNMENTS_TABLE,
    Key: {
      aoId: assignment.aoId,
      timestamp: assignment.timestamp
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
      assignment: assignment
    })
  } catch (err) {
    response.statusCode = 500
    response.body = JSON.stringify(err)
  }
  return response
}