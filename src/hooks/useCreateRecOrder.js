import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useCreateRecOrder() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(
        `${process.env.API_URL}/receiving_order/`,
        payload
      );
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('receivingOrders'),
    }
  );
}
