# Endpoints

Get all products: https://1b5qqn53cb.execute-api.eu-west-1.amazonaws.com/products

Get product by id (uuid): https://1b5qqn53cb.execute-api.eu-west-1.amazonaws.com/products/{id}


# Testing locally

Get all products: `sls invoke local --function getProducts`

Get product by id: `sls invoke local --function getProductById --data '{ "pathParameters": { "id": "<id>" } }'`


# Setting up DynamoDB

1. Specify AWS CLI profile `export AWS_PROFILE=<your-profile-name>`
1. `yarn run create-tables` to create tables in eu-west-1 region
1. `yarn run fill-tables` to fill tables with sample data
