const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.AOS_TABLE,
      Key: {
        regionId: lambda.param(event, 'regionId'),
        aoId: lambda.param(event, 'aoId')
      }
    }
    return await dynamo.get(params)
  })
}
