import axios from 'axios';

// Para rodar o banco: json-server --watch db.json
export const api = axios.create({
    baseURL: 'http://localhost:3000',
})