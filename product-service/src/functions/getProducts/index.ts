import { handlerPath } from '../../libs/handler-resolver';
import { AWSLambdaType } from '../../types';

const getProducts: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.getProducts`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',
      },
    },
  ],
};

export default getProducts;
