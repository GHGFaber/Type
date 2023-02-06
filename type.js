const options = {
	method: 'GET',
	headers: {
		Authorization: 'Token token=yd8WzkWNEEzGtqMSgiZBrwtt',
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'juanroldan1989-moviequotes-v1.p.rapidapi.com'
	}
};

fetch('https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes?actor=Al%20Pacino', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));