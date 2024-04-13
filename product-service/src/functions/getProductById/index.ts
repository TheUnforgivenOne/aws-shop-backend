import { handlerPath } from '../../libs/handler-resolver';
import { AWSLambdaType } from '../../types';

const getProductById: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: `/products/{id}`,
      },
    },
  ],
};

export default getProductById;
