const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
	}
};

async function getQuote(){

    const response =  await fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=movies', options);
	const data = await response.json();
	console.log(data);
	//document.getElementById('text').textContent = data[0].quote;
	//document.getElementById('source').textContent = data[0].
}

getQuote();