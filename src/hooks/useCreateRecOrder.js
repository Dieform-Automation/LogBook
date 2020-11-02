import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useCreateRecOrder() {
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(
        `${process.env.API_URL}/receiving_order/`,
        payload
      );
      return data;
    },
    {
      onSuccess: () => queryCache.refetchQueries('receiving_orders'),
    }
  );
}
