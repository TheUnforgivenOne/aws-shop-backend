import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { APIGatewayProxyHandler, Handler } from 'aws-lambda';

const port = process.env.PORT || 4000;
// let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port);
  // await app.init();
  // const expressApp = app.getHttpAdapter().getInstance();
  // return serverlessExpress({ app: expressApp });
}
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

// export const handler: Handler = async (event, context, callback) => {
//   server = server ?? (await bootstrap());

//   return server(event, context, callback);
// };
