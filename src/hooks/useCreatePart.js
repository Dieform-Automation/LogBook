import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useCreatePart() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.post(`${process.env.API_URL}/part/`, payload);
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('parts'),
    }
  );
}
