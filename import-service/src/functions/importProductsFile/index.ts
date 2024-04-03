import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/import',
      },
    },
  ],
};
