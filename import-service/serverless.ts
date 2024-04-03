import type { AWS } from '@serverless/typescript';

import { importProductsFile } from 'src/functions';

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
  },
  functions: { importProductsFile },
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
