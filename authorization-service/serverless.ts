import type { AWS } from '@serverless/typescript';

import { basicAuthorizer } from 'src/functions';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    profile: 'personal-account',
    runtime: 'nodejs20.x',
    environment: {},
    iamRoleStatements: [],
  },
  functions: { basicAuthorizer },
  package: { individually: true },
  resources: {},
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
