import api from '../initial';

const congratulationCards = {
	get: () => api.get('/congratulationCards')
		.then(data => data)
		.catch(error => {
			throw new Error(error);
		}),
	post: (data) => api.post('/congratulationCards', data)
		.then(data => data)
		.catch(error => {
			throw new Error(error);
		}),
	delete: (id) => api.delete(`/congratulationCards/${id}`)
		.then(data => data)
		.catch(error => {
			throw new Error(error);
		}),
	put: (id, params) => api.put(`/congratulationCards/${id}`, params)
		.then(data => data)
		.catch(error => {
			throw new Error(error);
		}),
}

export default congratulationCards;
