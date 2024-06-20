import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_API_URL!;

export const eventsApi = axios.create({
  baseURL: BASE_URL
});

export const fetchEventsApiData = async <T>(req: string): Promise<T> => {
  const res = await eventsApi.get<T>(req);
  return res.data;
};

export default eventsApi;
