const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fea301b3a8mshb2daee565fe6347p10e567jsn442367504eaa',
		'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
	}
};
let quote = [];
async function getQuote(){

    const response =  await fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=movies', options);
	const data = await response.json();
	quote = data[0].quote;
	Game();
}

function format(text){
	return `<div class = "word">
	<span class = "letter">
	${text.split('').join('</span><span class = letter>')}
	</span></div>`;
}
function Game(){
	//document.getElementById('text').innerHTML = quote;
	document.getElementById('text').innerHTML += format(quote);
}

getQuote();