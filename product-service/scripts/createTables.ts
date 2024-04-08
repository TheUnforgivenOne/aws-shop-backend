import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-west-1',
});

const poductTableSchema: CreateTableCommandInput = {
  TableName: 'products',
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

const stocksTableSchema: CreateTableCommandInput = {
  TableName: 'stocks',
  AttributeDefinitions: [
    {
      AttributeName: 'product_id',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'product_id',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

const createTable = async (tableSchema: CreateTableCommandInput) => {
  const command = new CreateTableCommand(tableSchema);

  try {
    const response = await client.send(command);
    console.log(`Table "${response.TableDescription.TableName}" created`);
  } catch (e) {
    if ((e.name = 'TableAlreadyExistsException')) {
      console.log(`Table "${tableSchema.TableName}" already exists, skipping`);
    } else {
      console.log(`Something went wrong during "${tableSchema.TableName}" table creation\n`, e);
    }
  }
};

createTable(poductTableSchema);
createTable(stocksTableSchema);
