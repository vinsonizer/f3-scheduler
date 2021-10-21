const dynamo = require('./utils/dynamo')
const lambda = require('./utils/lambda')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const input = lambda.getInput(event)
    const pax = {
      ...input,
      paxId: input.id || context.awsRequestId,
      regionId: lambda.param(event, 'regionId')
    }

    const params = {
      TableName: process.env.PAX_TABLE,
      Key: {
        regionId: pax.regionId,
        paxId: pax.paxId
      },
      Item: pax
    }

    await dynamo.put(params)
    return pax
  })
}
