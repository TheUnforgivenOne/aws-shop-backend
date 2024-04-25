# Endpoints

Get signed url - https://ejyo0nig7c.execute-api.eu-west-1.amazonaws.com/import (query: { name: string })

You may try to upload .csv file from FE https://d2qdvzqkemc1x0.cloudfront.net/admin/products

Example of .csv you can found  on the root folder of this service

# Testing locally

Create new signed url: `sls invoke local --function importProductsFile --data '{ "queryStringParameters": { "name": "test" } }'`

Run parser: `sls invoke local --function importFileParser --path 'src/functions/importFileParser/event.json'`
