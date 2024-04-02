import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { IGetItemCommandOutput, IScanCommandOutput, Product, Stock } from './types';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

class DBClient {
  constructor() {}

  getAllProducts() {
    const command = new ScanCommand({ TableName: process.env.PRODUCTS_TABLE });

    return docClient.send(command) as Promise<IScanCommandOutput<Product>>;
  }

  getAllStocks() {
    const command = new ScanCommand({ TableName: process.env.STOCKS_TABLE });
    return docClient.send(command) as Promise<IScanCommandOutput<Stock>>;
  }

  getProductById(id: string) {
    const command = new GetCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    });
    return docClient.send(command) as Promise<IGetItemCommandOutput<Product>>;
  }

  getStockById(id: string) {
    const command = new GetCommand({
      TableName: process.env.STOCKS_TABLE,
      Key: { product_id: id },
    });
    return docClient.send(command) as Promise<IGetItemCommandOutput<Stock>>;
  }
}

export default new DBClient();
