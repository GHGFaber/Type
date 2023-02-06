const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=movies', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

async function getQuote(){
	fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=movies', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    const response =  await fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=movies', options);
	const data = await response.json();

	console.log(data[0].quote);
	document.getElementById('text').textContent = data[0].quote;
}

getQuote();