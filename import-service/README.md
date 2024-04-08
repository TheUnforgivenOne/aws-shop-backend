# Endpoints

Get signed url - https://ejyo0nig7c.execute-api.eu-west-1.amazonaws.com/import (query: { name: string })


# Testing locally

Create new signed url: `sls invoke local --function importProductsFile --data '{ "queryStringParameters": { "name": "test" } }'`
