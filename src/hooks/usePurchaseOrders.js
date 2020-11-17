import { useQuery } from 'react-query';
import axios from 'axios';

export default function usePurchaseOrders() {
  return useQuery('purchaseOrders', async () => {
    const { data } = await axios.get(`${process.env.API_URL}/purchase_order/`);
    return data;
  });
}
