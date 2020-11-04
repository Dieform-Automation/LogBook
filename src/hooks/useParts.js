import { useQuery } from 'react-query';
import axios from 'axios';

export default function useParts(customerId) {
  return customerId
    ? useQuery(['parts', customerId], async () => {
        const { data } = await axios.get(
          `${process.env.API_URL}/part?customer_id=${customerId}`
        );
        return data;
      })
    : useQuery('parts', async () => {
        const { data } = await axios.get(`${process.env.API_URL}/part/`);
        return data;
      });
}
