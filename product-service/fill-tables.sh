# Products table
aws dynamodb put-item --table-name products --region eu-west-1 --item file://sample-data/products/product1.json
aws dynamodb put-item --table-name products --region eu-west-1 --item file://sample-data/products/product2.json
aws dynamodb put-item --table-name products --region eu-west-1 --item file://sample-data/products/product3.json
aws dynamodb put-item --table-name products --region eu-west-1 --item file://sample-data/products/product4.json
aws dynamodb put-item --table-name products --region eu-west-1 --item file://sample-data/products/product5.json

# Stocks table
aws dynamodb put-item --table-name stocks --region eu-west-1 --item file://sample-data/stocks/stock1.json
aws dynamodb put-item --table-name stocks --region eu-west-1 --item file://sample-data/stocks/stock2.json
aws dynamodb put-item --table-name stocks --region eu-west-1 --item file://sample-data/stocks/stock3.json
aws dynamodb put-item --table-name stocks --region eu-west-1 --item file://sample-data/stocks/stock4.json
aws dynamodb put-item --table-name stocks --region eu-west-1 --item file://sample-data/stocks/stock5.json
