import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const basicAuthorizer = async (event: APIGatewayAuthorizerEvent) => {
  if (event.type !== 'TOKEN') {
    return {
      statusCode: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const authHeader = (event as APIGatewayTokenAuthorizerEvent).authorizationToken;

    if (!authHeader) {
      return {
        statusCode: 401,
        message: 'Unauthorized',
      };
    }

    const token = authHeader.split(' ')[1];
    const tokenDecoded = Buffer.from(token, 'base64').toString();
    const [username, password] = tokenDecoded.split('=');

    const effect = process.env[username] && process.env[username] === password ? 'Allow' : 'Deny';
    const policy = generatePolicy(token, effect, event.methodArn);

    return policy;
  } catch (e) {
    return {
      statusCode: 403,
      message: 'Access denied',
    };
  }
};

const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
