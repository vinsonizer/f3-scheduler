const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.AOS_TABLE,
      KeyConditionExpression: '#regionId = :rId',
      ExpressionAttributeNames: {
        '#regionId': 'regionId'
      },
      ExpressionAttributeValues: {
        ':rId': lambda.param(event, 'regionId')
      }
    }
    return await dynamo.query(params)
  })
}
