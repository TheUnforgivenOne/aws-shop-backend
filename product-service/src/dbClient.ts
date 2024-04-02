import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { IGetItemCommandOutput, IScanCommandOutput, Product, Stock } from './types';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

class DBClient {
  private productsTable: string;
  private stocksTable: string;

  constructor() {
    this.productsTable = process.env.PRODUCTS_TABLE;
    this.stocksTable = process.env.STOCKS_TABLE;
  }

  getAllProducts() {
    const command = new ScanCommand({ TableName: this.productsTable });

    return docClient.send(command) as Promise<IScanCommandOutput<Product>>;
  }

  getAllStocks() {
    const command = new ScanCommand({ TableName: this.stocksTable });
    return docClient.send(command) as Promise<IScanCommandOutput<Stock>>;
  }

  getProductById(id: string) {
    const command = new GetCommand({
      TableName: this.productsTable,
      Key: { id },
    });
    return docClient.send(command) as Promise<IGetItemCommandOutput<Product>>;
  }

  getStockById(id: string) {
    const command = new GetCommand({
      TableName: this.stocksTable,
      Key: { product_id: id },
    });
    return docClient.send(command) as Promise<IGetItemCommandOutput<Stock>>;
  }

  createProduct(product: Product, stock: Stock) {
    const command = new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.productsTable,
            Item: product,
          },
        },
        {
          Put: {
            TableName: this.stocksTable,
            Item: stock,
          },
        },
      ],
    });

    return docClient.send(command);
  }
}

export default new DBClient();
