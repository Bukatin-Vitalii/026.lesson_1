import axios from 'axios';

const api = axios.create({
	baseURL: 'https://65abd6e6fcd1c9dcffc71d7e.mockapi.io/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
