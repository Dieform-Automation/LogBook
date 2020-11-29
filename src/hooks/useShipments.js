import { useQuery } from 'react-query';
import axios from 'axios';

export default function useShipments() {
  return useQuery('shipments', async () => {
    const { data } = await axios.get(`${process.env.API_URL}/shipment/`);
    return data;
  });
}
