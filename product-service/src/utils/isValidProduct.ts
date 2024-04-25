import { ProductDTO } from '../types';

export default (dto: ProductDTO) => dto?.title?.length && dto?.description?.length && dto?.price && dto?.count;
