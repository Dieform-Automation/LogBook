import { useQuery } from 'react-query';
import axios from 'axios';

export default function useCustomers() {
  return useQuery('customers', async () => {
    const { data } = await axios.get(`${process.env.API_URL}/customer/`);
    return data;
  });
}
