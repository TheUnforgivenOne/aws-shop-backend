import type { AWS } from '@serverless/typescript';

import createProduct from '@functions/createProduct';
import getProducts from '@functions/getProducts';
import getProductById from '@functions/getProductById';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'eu-west-1',
    profile: 'personal-account',
    httpApi: {
      cors: true,
    },
    environment: {
      PRODUCTS_TABLE: '${self:custom.productsTable}',
      STOCKS_TABLE: '${self:custom.stocksTable}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:PutItem', 'dynamodb:Get*', 'dynamodb:Scan*'],
        Resource: 'arn:aws:dynamodb:eu-west-1:*:*',
      },
    ],
  },
  // import the function via paths
  functions: { createProduct, getProductById, getProducts },
  package: { individually: true },
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
    productsTable: 'products',
    stocksTable: 'stocks',
  },
};

module.exports = serverlessConfiguration;
