import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useCreateCustomer() {
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(`${process.env.API_URL}/customer/`, payload);
      return data;
    },
    {
      onSuccess: () => queryCache.refetchQueries('customers'),
    }
  );
}
