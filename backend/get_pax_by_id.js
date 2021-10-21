const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.PAX_TABLE,
      Key: {
        regionId: lambda.param(event, 'regionId'),
        paxId: lambda.param(event, 'paxId')
      }
    }
    return await dynamo.get(params)
  })
}
