const dynamo = require('./utils/dynamo')
const lambda = require('./utils/lambda')

exports.handler = async (event, context) => {
  return await lambda.getResult(async () => {
    const input = lambda.getInput(event)

    console.log('1')
    const assignment = {
      ...input,
      aoId: lambda.param(event, 'aoId')
    }
    console.log('2')

    const params = {
      TableName: process.env.ASSIGNMENTS_TABLE,
      Key: {
        aoId: assignment.aoId,
        timestamp: assignment.timestamp
      },
      Item: assignment
    }
    console.log('3')

    await dynamo.put(params)
    console.log('4')
    return assignment
  })
}
