import { DynamoDBClient, PutItemCommand, AttributeValue } from '@aws-sdk/client-dynamodb';
import sampleProducts from './sampleProducts.json';
import sampleStocks from './sampleStocks.json';

const client = new DynamoDBClient({
  region: 'eu-west-1',
});

const fillTable = async (tableName: string, items: Record<string, AttributeValue>[]) => {
  await Promise.all(
    items.map(async (item) => {
      const command = new PutItemCommand({
        TableName: tableName,
        Item: item,
      });

      try {
        await client.send(command);
        console.log(`"${tableName}" table filled with new item`);
      } catch (e) {
        console.log(`Error while adding item to the ${tableName} table`);
      }
    })
  );
};

fillTable('products', sampleProducts);
fillTable('stocks', sampleStocks);
