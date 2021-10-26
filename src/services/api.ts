import axios from 'axios';

const api = axios.create({
  baseURL: 'http://m2hmg.eastus.cloudapp.azure.com/api/',

});

export default api ;
