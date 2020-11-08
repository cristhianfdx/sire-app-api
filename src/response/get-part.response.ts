import { GetBranchResponse } from './get-branch.response';
import { GetStockResponse } from './get-stock.response';

export interface GetPartResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  branch: GetBranchResponse;
  stock?: GetStockResponse;
}
