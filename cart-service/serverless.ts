import { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'cart-service',
  frameworkVersion: '3',
  plugins: ['serverless-offline', 'serverless-dotenv-plugin'],

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'eu-west-1',
    profile: 'personal-account',
  },

  functions: {
    main: {
      handler: 'dist/main.handler',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
