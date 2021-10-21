const dynamo = require('./utils/dynamo')
const lambda = require('./utils/lambda')
const utils = require('./utils/string_utils')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const input = lambda.getInput(event)
    const region = {
      ...input,
      regionId: input.regionId || utils.slugify(input.regionName)
    }

    const params = {
      TableName: process.env.REGIONS_TABLE,
      Key: {
        regionId: region.regionId
      },
      Item: region
    }

    await dynamo.put(params)
    return region
  })
}
