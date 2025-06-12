/**
 * Configured axios client for the PostgreSQL backend.
 * 
 * - The database is connected via a Node.js/Express API on port 4000.
 * - This client is used for requests targeting the PostgreSQL database (e.g., adding stores, items).
 */
import axios from 'axios';

const axiosClientPg = axios.create({
  baseURL: 'http://localhost:4000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClientPg;