import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/data/',
});

const fetchData = async (endpoint, searchText) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY; 
    const response = await instance.get(endpoint, {
      headers: {
        "X-API-KEY": apiKey,
      },
      params: {
        searchText: searchText,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchData };
