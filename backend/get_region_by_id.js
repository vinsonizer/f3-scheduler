const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.REGIONS_TABLE,
      Key: {
        regionId: lambda.param(event, 'regionId')
      }
    }
    return await dynamo.get(params)
  })
}
