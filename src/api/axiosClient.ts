/**
 * Configured axios client for HTTP requests within the application.
 * 
 * - Sets the base URL for all requests to the backend.
 * - Defines default headers, specifically to send JSON content.
 */
import axios from 'axios'; 

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default axiosClient;