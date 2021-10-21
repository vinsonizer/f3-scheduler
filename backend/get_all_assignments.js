const lambda = require('./utils/lambda')
const dynamo = require('./utils/dynamo')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const params = {
      TableName: process.env.ASSIGNMENTS_TABLE
    }
    return await dynamo.scan(params)
  })
}
