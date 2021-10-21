const dynamo = require('./utils/dynamo')
const lambda = require('./utils/lambda')
const utils = require('./utils/string_utils')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const input = lambda.getInput(event)

    const ao = {
      ...input,
      aoId: input.aoId || utils.slugify(input.aoName),
      regionId: lambda.param(event, 'regionId')
    }

    const params = {
      TableName: process.env.AOS_TABLE,
      Key: {
        aoId: ao.aoId,
        regionId: ao.regionId
      },
      Item: ao
    }

    await dynamo.put(params)
    return ao
  })
}
