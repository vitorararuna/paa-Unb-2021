import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9080/crawl.json?start_requests=true&spider_name=stackcrawler',
});

export default api;