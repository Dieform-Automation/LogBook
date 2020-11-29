import { useQuery } from 'react-query';
import axios from 'axios';

export default function useShipments() {
  return useQuery('receivingOrders', async () => {
    const { data } = await axios.get(`${process.env.API_URL}/receiving_order/`);
    return data;
  });
}
