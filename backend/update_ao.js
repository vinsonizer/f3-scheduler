// Include the AWS SDK module
const AWS = require('aws-sdk')
const utils = require('backend/utils')

// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`event is ${JSON.stringify(event)}`)

  const input = JSON.parse(event.body)
  console.log(`input is ${input}`)

  const theId = input.aoId || utils.slugify(input.aoName)
  const regionId = event.pathParameters.regionId

  const ao = {
    aoId: theId,
    aoName: input.aoName,
    regionId: input.regionId,
    gpsCoordinates: input.gpsCoordinates,
    type: input.type,
    dayOfWeek: input.dayOfWeek,
    startTime: input.startTime,
    endTime: input.endTime,
    siteQId: input.siteQId
  }

  const params = {
    TableName: process.env.AOS_TABLE,
    Key: {
      aoId: ao.aoId,
      regionId: ao.regionId
    },
    Item: ao
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
    response.body = JSON.stringify(ao)
  } catch (err) {
    response.statusCode = 500
    response.body = JSON.stringify(err)
  }
  return response
}