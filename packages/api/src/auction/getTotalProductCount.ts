import z from 'zod';
import { safeGet } from '../_instance/safe';

export const GetTotalProductCountResponseSchema = z.object({
  count: z.string(),
});

export type GetTotalProductCountResponse = z.infer<typeof GetTotalProductCountResponseSchema>;

export const getTotalProductCount = (): Promise<GetTotalProductCountResponse> => {
  return safeGet(GetTotalProductCountResponseSchema)('/auctions/statistics/products/total');
};
