import { GetBrandResponse } from './get-brand.response';
import { GetStockResponse } from './get-stock.response';

export interface GetPartResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  brand: GetBrandResponse;
  stock?: GetStockResponse;
}
