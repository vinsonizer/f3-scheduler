const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

const sendResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return response;
};

const validateInput = (data) => {
  const body = JSON.parse(data);
  const { email, password } = body;
  if (!email || !password || password.length < 6) {
    return false;
  } else {
    return true;
  }
};

exports.signup = async (event) => {
  try {
    console.log(JSON.stringify(event, null, 2));
    const isValid = validateInput(event.body);
    if (!isValid) {
      return sendResponse(400, { message: "Invalid input" });
    }
    const { email, password, name, nickname } = JSON.parse(event.body);
    const userPoolId = process.env.USER_POOL_ID;
    const params = {
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "name",
          Value: name,
        },
        {
          Name: "nickname",
          Value: nickname,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      MessageAction: "SUPPRESS",
    };
    const response = await cognito.adminCreateUser(params).promise();
    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: userPoolId,
        Username: email,
        Permanent: true,
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();
    }
    return sendResponse(200, { message: "User registration successful" });
  } catch (error) {
    const message = error.message ? error.message : "Internal server error";
    return sendResponse(500, { message });
  }
};

exports.login = async (event) => {
  try {
    const isValid = validateInput(event.body);
    if (!isValid) {
      return sendResponse(400, { message: "Invalid input" });
    }

    const { email, password } = JSON.parse(event.body);
    const userPoolId = process.env.USER_POOL_ID;
    const clientId = process.env.CLIENT_ID;
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: userPoolId,
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    return sendResponse(200, {
      message: "Success",
      token: response.AuthenticationResult.IdToken,
    });
  } catch (error) {
    const message = error.message ? error.message : "Internal server error";
    return sendResponse(500, { message });
  }
};

exports.listUsers = async (event) => {
  try {
    const userPoolId = process.env.USER_POOL_ID;
    const clientId = process.env.CLIENT_ID;
    const params = {
      AttributesToGet: ["email", "name", "nickname"],
      UserPoolId: userPoolId,
    };
    const response = await cognito.listUsers(params).promise();
    return sendResponse(200, {
      message: "Success",
      token: response,
    });
  } catch (error) {
    const message = error.message ? error.message : "Internal server error";
    return sendResponse(500, { message });
  }
};
