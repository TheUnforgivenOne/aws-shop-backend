import { handlerPath } from '../../libs/handler-resolver';
import { AWSLambdaType } from '../../types';

const catalogBatchProcess: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': ['CatalogItemsQueue', 'Arn'],
        },
        batchSize: 2,
      },
    },
  ],
};

export default catalogBatchProcess;
