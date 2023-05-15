

const words = 'negative season due chest point smile electric bicycle term dirt mark doll will strong cook noun bean myself band shelter brush meat snow object once including wonder taken attack fairly early if event brass coach pink discuss port beauty clear cow select popular skill usually face basis water pass examine connected without hour split prove weather bigger,caught,agree,clock,are,attempt,therefore,hang,milk,home,special,thank,trouble,thousand,aloud,name,follow,eight,evening,root,success,stone,made,poem,frame,organization,earn,broke,larger,whether,coffee,distant,congress,silence,cut,broken,studying,left,language,look,getting,state,development,percent,quietly,purple,ground,vertical,rabbit,series,gone,fireplace,consider,indicate,teacher,paid,struck,universe,soft,needs,stick,jungle,wave,pond,truck,drawn,stand,chose,imagine,tightly,buried,mile,away,burn,steel,fence,wall,whispered,slipped,receive,cap,keep,log,together,written,story,list,fire,search,arrive,hello,hand,potatoes,hurt,claws,belong,worker,onlinetools,nearly,now,medicine,river,height,been,flow,pupil,college,situation,how,than exclaimed sudden frog cell increase idea contrast official greater land raise growth dog exciting fought car break unknown worried lot practical well visit apartment favorite fat'.split(',').join(' ').split(' ');
const wordsSize = words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.start = null;

function randomizePrompt(){
	const Index = Math.ceil(Math.random() * wordsSize);
	return words[Index-1];
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
	for(let i = 0; i < 100; i++){
		document.getElementById('text').innerHTML += format(randomizePrompt());
	}
	addClass(document.querySelector('.word'), 'current');
	addClass(document.querySelector('.letter'), 'current');
	window.timer = null;
}

function WPM(){
	const words = [...document.querySelectorAll('.word')];
	const lastWord = document.querySelector('.word.current');
	const lwIndex = words.indexOf(lastWord);
	const wordsTyped = words.slice(0, lwIndex);
	const correctWords = wordsTyped.filter(word => {
		const letters =  [...word.children];
		const incorrect = letters.filter(letter => letter.className.includes('wrong'))
		const correct = letters.filter(letter => letter.className.includes('right'))
		return incorrect.length === 0 && correct.length === letters.length
	});
	return (correctWords.length / gameTime * (60000));
}



function gameOver(){

	clearInterval(window.timer);
	addClass(document.getElementById('Game'), 'over');
	const result = WPM();
	axios.post('http://localhost:3000/', {WPM: result})
  	.then(function (response) {
    	console.log(response);
  	})
  	.catch(function (error) {
    	console.error(error);
  	});
	document.getElementById('time').innerHTML = `${result} WPM`;
}

//keyboard events
document.getElementById('Game').addEventListener('keyup', ev => {
	const key = ev.key;
	const currentLetter = document.querySelector('.letter.current');
	const expected = currentLetter?.innerHTML || ' ';	//if no current letter, we need a space
	const letter = key.length === 1 && key !== ' ';
	const space = key === ' ';
	const currentWord = document.querySelector('.word.current');
	const backspace = key === 'Backspace';
	const isFirstLetter =  currentLetter === currentWord.firstChild;
	//const isLastLetter =  currentLetter === currentWord.lastChild;
	const extra = document.querySelector('.letter.extra');

	if (document.querySelector('#Game.over')){
		return;
	}
	console.log(key,expected);

	if (!window.timer && letter) {
		window.timer = setInterval(() => {
			if(!window.start) {
				window.start = (new Date()).getTime();
			}
			const currentTime = (new Date()).getTime();
			const millisPassed = currentTime - window.start
			const secondsPassed = Math.round(millisPassed/1000);
			const secondsLeft = (gameTime / 1000) - secondsPassed 
			if (secondsLeft <= 0){
				gameOver();
				return;
			}
			document.getElementById('time').innerHTML = secondsLeft + '';
		}, 1000);
	}

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
			const wrongletters = [...document.querySelectorAll('.word.current.letter:not(.right)')];
			wrongletters.forEach(letter => {
				addClass(letter, 'wrong');
			});
		}
		removeClass(currentWord, 'current');
		addClass(currentWord.nextSibling, 'current');
		if(currentLetter){
			removeClass(currentLetter, 'current');
		}
		addClass(currentWord.nextSibling.firstChild, 'current');
	}
	if(backspace){
		if(currentLetter && isFirstLetter){
			//prev word current last letter current
			removeClass(currentWord, 'current');
			addClass(currentWord.previousSibling, 'current');
			removeClass(currentLetter, 'current');
			addClass(currentWord.previousSibling.lastChild, 'current');
			removeClass(currentWord.previousSibling.lastChild, 'wrong');
			removeClass(currentWord.previousSibling.lastChild, 'right');
		}
		if(currentLetter && !isFirstLetter){
			//move back one letter and invalidate
			removeClass(currentLetter, 'current');
			addClass(currentLetter.previousSibling, 'current');
			removeClass(currentLetter.previousSibling, 'wrong');
			removeClass(currentLetter.previousSibling, 'right');
		}
		if(!currentLetter){
			//move back one letter and invalidate
			addClass(currentWord.lastChild, 'current');
			removeClass(currentWord.lastChild, 'wrong');
			removeClass(currentWord.lastChild, 'right');
		}
		if(extra){
			//const extraLetter = document.getElementById('.extra');
			currentWord.removeChild(currentWord.lastChild);
		}
	}
	
	//move lines / words

	if (currentWord.getBoundingClientRect().top > 150) {
		const text = document.getElementById('text');
		const margin = parseInt(text.style.marginTop || '0px');
		text.style.marginTop = (margin - 55) + 'px';
	}

	//cursor handling
	const nextLetter =  document.querySelector('.letter.current');
	const nextWord =  document.querySelector('.word.current');
	const cursor = document.getElementById('cursor');
	cursor.style.top = ( nextLetter || nextWord ).getBoundingClientRect().top + 'px';
	cursor.style.left = ( nextLetter || nextWord ).getBoundingClientRect()[ nextLetter ? 'left' : 'right' ] + 'px';
});

Game();