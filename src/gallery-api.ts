import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

const ACCESS_KEY = 'tE9h_sLoKNxlgSvGRrAdSmv_mm508biQD2cvngspfqk';

export async function fetchPhotosByQuery<T>(
  searchQuery: string,
  currentPage: number
): Promise<T> {
  const response = await axios.get<T>(`search/photos`, {
    params: {
      query: searchQuery,
      page: currentPage,
      per_page: 12,
      client_id: ACCESS_KEY,
      orientation: 'landscape',
    },
  });
  return response.data;
}
