import type { AWS } from '@serverless/typescript';

import { importProductsFile, importFileParser } from 'src/functions';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    profile: 'personal-account',
    runtime: 'nodejs20.x',
    environment: {
      sqsUrl: '${self:custom.sqsUrl}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
        Resource: 'arn:aws:s3:::shop-import-service-bucket/*',
      },
      {
        Effect: 'Allow',
        Action: ['sqs:SendMessage'],
        Resource: 'arn:aws:sqs:eu-west-1:*:*',
      },
    ],
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    Resources: {
      GatewayResponse401: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'UNAUTHORIZED',
          RestApiId: { Ref: 'ApiGatewayRestApi' },
        },
      },
      GatewayResponse403: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'ACCESS_DENIED',
          RestApiId: { Ref: 'ApiGatewayRestApi' },
        },
      },
      importServiceBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${self:custom.bucketName}',
          VersioningConfiguration: {
            Status: 'Suspended',
          },
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT'],
                AllowedOrigins: ['*'],
              },
            ],
          },
        },
      },
    },
  },
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
    bucketName: 'shop-import-service-bucket',
    sqsUrl: 'https://sqs.eu-west-1.amazonaws.com/851725182685/catalogItemsQueue',
  },
};

module.exports = serverlessConfiguration;
