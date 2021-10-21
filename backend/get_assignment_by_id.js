const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.ASSIGNMENTS_TABLE,
      Key: {
        aoId: lambda.param(event, 'aoId'),
        timestamp: lambda.param(event, 'timestamp')
      }
    }
    return await dynamo.get(params)
  })
}
