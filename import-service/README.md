# Testing locally

Create new signed path: `sls invoke local --function importProductsFile --data '{ "queryStringParameters": { "name": "test" } }'`

Parse all uploaded files: `sls invoke local --function importFileParser`
