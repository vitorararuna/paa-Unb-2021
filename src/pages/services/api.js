import axios from 'axios';

const api = axios.create({
    baseURL: 'http://paa-backend-webcrawler.herokuapp.com',
});

export default api;