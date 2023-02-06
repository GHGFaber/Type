const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes', options)
	.then(response => {
        return response.json();
    })
    .then((data) => {
        let quote = data;
    })
	.then(response => console.log(quote))
	.catch(err => console.error(err));