# Endpoints

# Testing locally

Get Base64 token `node encode <string-to-encode (TheUnforgivenOne=TEST_PASSWORD)>`

Call basic authorizer `sls invoke local --function basicAuthorizer --path 'src/functions/basicAuthorizer/event.json'`
