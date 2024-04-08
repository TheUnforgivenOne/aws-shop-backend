import { ScanCommandOutput, GetCommandOutput } from '@aws-sdk/lib-dynamodb';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
};

export type Stock = {
  product_id: string;
  count: number;
};

export type IScanCommandOutput<T> = Omit<ScanCommandOutput, 'Items'> & {
  Items?: T[];
};

export type IGetItemCommandOutput<T> = Omit<GetCommandOutput, 'Item'> & {
  Item?: T;
};
