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
	console.log(quote);
	Game();
}
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
		document.getElementById('text').innerHTML = '';
		document.getElementById('text').innerHTML += format(quote);
		addClass(document.querySelector('.word'), 'current');
		addClass(document.querySelector('.letter'), 'current');
	}

	//keyboard events
	document.getElementById('Game').addEventListener('keyup', ev => {
		const key = ev.key;
		const currentLetter = document.querySelector('.letter.current');
		const expected = currentLetter?.innerHTML || ' ';	//if no current letter, we need a space
		const letter = key.length === 1 && key !== ' ';
		const space = key === ' ';
		const currentWord = document.querySelector('.word.current');
	
		console.log(key,expected);
	
		if(letter){
			if(currentLetter){
				addClass(currentLetter, key === expected ? 'right' : 'wrong' );
				removeClass(currentLetter, 'current');
				//addClass(currentLetter.nextSibling, 'current');
				if(currentLetter.nextSibling){
					addClass(currentLetter.nextSibling, 'current');
				}
			} else {
				const wrongLetter = document.createElement('span');
				wrongLetter.innerHTML = key;
				wrongLetter.className = 'letter wrong extra';
				currentWord.appendChild(wrongLetter);
			}
		}
	
		if(space){
			if(expected !== ' '){
				const wrongletters = [...document.querySelectorAll('.word.current .letter:not(.right)')];
				wrongletters.forEach(letter => {
					addClass(letter, 'wrong');
				});
			}
			removeClass(currentLetter, 'current');
			addClass(currentLetter.nextSibling, 'current');
			if(currentLetter){
				removeClass(currentLetter, 'current');
			}
			addClass(currentLetter.nextSibling.firstChild, 'current');
			}
		});

//here for the moment until implemented 

//const words = 'negative season due chest point smile electric bicycle term dirt mark doll will strong cook noun bean myself band shelter brush meat snow object once including wonder taken attack fairly early if event brass coach pink discuss port beauty clear cow select popular skill usually face basis water pass examine connected without hour split prove weather bigger,caught,agree,clock,are,attempt,therefore,hang,milk,home,special,thank,trouble,thousand,aloud,name,follow,eight,evening,root,success,stone,made,poem,frame,organization,earn,broke,larger,whether,coffee,distant,congress,silence,cut,broken,studying,left,language,look,getting,state,development,percent,quietly,purple,ground,vertical,rabbit,series,gone,fireplace,consider,indicate,teacher,paid,struck,universe,soft,needs,stick,jungle,wave,pond,truck,drawn,stand,chose,imagine,tightly,buried,mile,away,burn,steel,fence,wall,whispered,slipped,receive,cap,keep,log,together,written,story,list,fire,search,arrive,hello,hand,potatoes,hurt,claws,belong,worker,onlinetools,nearly,now,medicine,river,height,been,flow,pupil,college,situation,how,than exclaimed sudden frog cell increase idea contrast official greater land raise growth dog exciting fought car break unknown worried lot practical well visit apartment favorite fat'.split(',').join(' ').split(' ');
//const wordsSize = words.length;

/*function randomizePrompt(){
	const Index = Math.ceil(Math.random() * wordsSize);
	return words[Index-1];
}*/
getQuote();