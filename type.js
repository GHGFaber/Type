const words = '';

function addClass(el, name){
	el.className += ' '+name;
}
function removeClass(el, name){
	el.className = el.className.replace(name, '');
}
function format(text){
	return `<div class = "word"><span class = "letter">${text.split('').join('</span><span class = letter>')}</span></div>`;
}

function Game(){
	//document.getElementById('text').innerHTML = quote;
	document.getElementById('text').innerHTML += format(quote);
	addClass(document.querySelector('.word'), 'current');
	addClass(document.querySelector('.letter'), 'current'); 
	document.getElementById('Game').addEventListener('keyup', ev => {
		const key = ev.key;
		const currentLetter = document.querySelector('.letter.current');
		const expected = currentLetter.innerHTML;

		console.log({key,expected});
	})
}
Game();