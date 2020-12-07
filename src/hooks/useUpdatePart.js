import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';

export default function useUpdatePart() {
  const cache = useQueryCache();
  return useMutation(
    async (payload) => {
      const { data } = await axios.put(
        `${process.env.API_URL}/part/${payload.id}`,
        payload
      );
      return data;
    },
    {
      onSuccess: () => cache.invalidateQueries('parts'),
    }
  );
}
