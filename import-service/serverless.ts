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
    environment: {},
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:GetObject', 's3:PutObject'],
        Resource: 'arn:aws:s3:::shop-import-service-bucket/*',
      },
    ],
    httpApi: {
      cors: true,
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    Resources: {
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
  },
};

module.exports = serverlessConfiguration;
