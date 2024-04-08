# Endpoints

Get all products: (GET) https://ma2vf10m84.execute-api.eu-west-1.amazonaws.com/products

Get product by id (uuid): (GET) https://ma2vf10m84.execute-api.eu-west-1.amazonaws.com/products/{id}

Create new product: (POST) https://ma2vf10m84.execute-api.eu-west-1.amazonaws.com/products

# Testing locally

Get all products: `sls invoke local --function getProducts`

Get product by id: `sls invoke local --function getProductById --data '{ "pathParameters": { "id": "<id>" } }'`

Create product: `sls invoke local --function createProduct --data '{ "body": "{ \"title\": \"New cat\", \"description\": \"New cat description\", \"price\": 250, \"count\": 1 }" }'`

# Setting up DynamoDB

1. Specify AWS CLI profile `export AWS_PROFILE=<your-profile-name>`
1. `yarn run create-tables` to create tables in eu-west-1 region
1. `yarn run fill-tables` to fill tables with sample data
