import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useCreateShipment() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(`${process.env.API_URL}/shipment/`, payload);
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('shipments'),
    }
  );
}
