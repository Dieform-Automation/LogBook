import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useCreatePO() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(
        `${process.env.API_URL}/purchase_order/`,
        payload
      );
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('purchaseOrders'),
    }
  );
}
