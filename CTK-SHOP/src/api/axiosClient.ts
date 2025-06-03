import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as needed
  /* baseURL: 'https://www.npmjs.com/package/json-server', */
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;