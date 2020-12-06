import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useUpdateCustomer() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.put(
        `${process.env.API_URL}/customer/${payload.id}`,
        payload
      );
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('customers'),
    }
  );
}
