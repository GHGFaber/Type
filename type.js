const words = 'negative season due chest point smile electric bicycle term dirt mark doll will strong cook noun bean myself band shelter brush meat snow object once including wonder taken attack fairly early if event brass coach pink discuss port beauty clear cow select popular skill usually face basis water pass examine connected without hour split prove weather bigger,caught,agree,clock,are,attempt,therefore,hang,milk,home,special,thank,trouble,thousand,aloud,name,follow,eight,evening,root,success,stone,made,poem,frame,organization,earn,broke,larger,whether,coffee,distant,congress,silence,cut,broken,studying,left,language,look,getting,state,development,percent,quietly,purple,ground,vertical,rabbit,series,gone,fireplace,consider,indicate,teacher,paid,struck,universe,soft,needs,stick,jungle,wave,pond,truck,drawn,stand,chose,imagine,tightly,buried,mile,away,burn,steel,fence,wall,whispered,slipped,receive,cap,keep,log,together,written,story,list,fire,search,arrive,hello,hand,potatoes,hurt,claws,belong,worker,onlinetools,nearly,now,medicine,river,height,been,flow,pupil,college,situation,how,than exclaimed sudden frog cell increase idea contrast official greater land raise growth dog exciting fought car break unknown worried lot practical well visit apartment favorite fat'.split(',').join(' ').split(' ');
const wordsSize = words.length;

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
}
document.getElementById('Game').addEventListener('keyup', ev => {
	const key = ey.key;
	const currentLetter = document.querySelector('.letter.current');
	const expected = currentLetter.innerHTML;
	const letter = key.length === 1 && key !== ' ';

	console.log(key,expected);

	if(letter){
		if(currentLetter){
			alert(key === expected? 'ok' : 'wrong');
		}
	}

})

Game();