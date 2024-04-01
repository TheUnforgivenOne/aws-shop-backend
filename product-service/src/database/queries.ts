import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();

export const getAllProducts = () => {
  return client.send(new ScanCommand({ TableName: process.env.PRODUCTS_TABLE }));
};

export const getAllStocks = () => {
  return client.send(new ScanCommand({ TableName: process.env.STOCKS_TABLE }));
};

export const getProductById = (id: string) => {
  return client.send(new GetCommand({ TableName: process.env.PRODUCTS_TABLE, Key: { id } }));
};

export const getStockById = (id: string) => {
  return client.send(new GetCommand({ TableName: process.env.STOCKS_TABLE, Key: { product_id: id } }));
};
