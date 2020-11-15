import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useCreateCustomer() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(`${process.env.API_URL}/customer/`, payload);
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('customers'),
    }
  );
}
