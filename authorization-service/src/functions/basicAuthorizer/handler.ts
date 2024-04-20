import { APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const basicAuthorizer = async (event, _, callback) => {
  if (event.type !== 'TOKEN') {
    callback('Unauthorized');
    return;
  }

  try {
    const authHeader = (event as APIGatewayTokenAuthorizerEvent).authorizationToken;

    const tokenBase64 = authHeader.split(' ')[1];
    const token = Buffer.from(tokenBase64, 'base64').toString();
    const [username, password] = token.split('=');

    const effect = process.env[username] && process.env[username] === password ? 'Allow' : 'Deny';
    const policy = generatePolicy(tokenBase64, effect, event.methodArn);

    callback(null, policy);
  } catch (e) {
    callback(`Unauthorized ${e}`);
  }
};

const generatePolicy = (principalId: string, effect: 'Allow' | 'Deny', resource: string) => ({
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
