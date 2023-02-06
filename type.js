const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

async function getQuote(){
    const response =  await fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes', options);
	const json = await response.json();
	const { quote } = json;
	console.log(quote);
}

getQuote();