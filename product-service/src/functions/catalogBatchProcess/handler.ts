import { SQSHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import dbClient from 'src/dbClient';
import { Product, Stock } from 'src/types';
import isValidProduct from 'src/utils/isValidProduct';

export const catalogBatchProcess: SQSHandler = async (event) => {
  const result = await Promise.all(
    event.Records.map(async (item) => {
      try {
        const params = JSON.parse(item.body);

        if (!isValidProduct(params)) return 'Product validation error';

        const { count, ...productData } = params;

        const id = uuid();
        const product: Product = { id, ...productData, imgUrl: '' };
        const stock: Stock = { product_id: id, count };

        await dbClient.createProduct(product, stock);

        return `Product ${id} imported`;
      } catch (e) {
        console.log(e);
        return 'Error while import product, check console';
      }
    })
  );

  console.log('Done', result);
};
