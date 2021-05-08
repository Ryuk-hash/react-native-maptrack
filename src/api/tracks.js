import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://5e1607dfe761.ngrok.io/api',
});

export default axiosInstance;
