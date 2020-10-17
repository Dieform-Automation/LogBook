import { useQuery } from 'react-query';
import axios from 'axios';

export default function useParts() {
  return useQuery('parts', async () => {
    const { data } = await axios.get('/api/part/');
    return data;
  });
}
