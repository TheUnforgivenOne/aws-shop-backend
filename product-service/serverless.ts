import type { AWS } from '@serverless/typescript';

import { catalogBatchProcess, createProduct, getProducts, getProductById } from 'src/functions';

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
      SNS_TOPIC_ARN: {
        Ref: 'CreateProductTopic',
      },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:PutItem', 'dynamodb:Get*', 'dynamodb:Scan*'],
        Resource: 'arn:aws:dynamodb:eu-west-1:*:*',
      },
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: 'arn:aws:sqs:eu-west-1:*:*',
      },
      {
        Effect: 'Allow',
        Action: ['sns:Publish'],
        Resource: {
          Ref: 'CreateProductTopic',
        },
      },
    ],
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:custom.resources.catalogItemsQueue}',
        },
      },
      CreateProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          DisplayName: '${self:custom.resources.createProductTopic}',
        },
      },
      CreateProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          Endpoint: 'vladislav_potapov@epam.com',
          TopicArn: {
            Ref: 'CreateProductTopic',
          },
        },
      },
      ErrorCreateProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          Endpoint: 'vladpotapow@yandex.ru',
          TopicArn: {
            Ref: 'CreateProductTopic',
          },
          FilterPolicy: {
            importStatus: ['WARNING'],
          },
        },
      },
    },
  },
  functions: { catalogBatchProcess, createProduct, getProductById, getProducts },
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
    resources: {
      catalogItemsQueue: 'catalogItemsQueue',
      createProductTopic: 'createProductTopic',
      createProductSubscription: 'createProductSubscription',
    },
    productsTable: 'products',
    stocksTable: 'stocks',
  },
};

module.exports = serverlessConfiguration;
