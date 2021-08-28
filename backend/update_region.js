// Include the AWS SDK module
const AWS = require('aws-sdk')
const utils = require('backend/utils')
// Instantiate a DynamoDB document client with the SDK
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log(`event is ${JSON.stringify(event)}`)

  const input = JSON.parse(event.body)
  console.log(`input is ${input}`)

  const id = input.id || utils.slugify(input.regionName)

  const region = {
    id: id,
    regionName: input.regionName,
    emailAddress: input.emailAddress,
    website: input.website,
    location: input.location,
    slt: input.slt
  }

  const params = {
    TableName: process.env.REGIONS_TABLE,
    Key: {
      id: region.id
    },
    Item: region
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
      region: region
    })
  } catch (err) {
    response.statusCode = 500
    response.body = JSON.stringify(err)
  }
  return response
}