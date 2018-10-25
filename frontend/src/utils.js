export function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function toTimerString(timeInMs) {
	const min = Math.floor(timeInMs/60000);
  const sec = Math.floor((timeInMs/1000)%60);
  const msec = Math.floor((timeInMs/10)%100);

  const minStr = min < 10 ? '0' + min : min;
  const secStr = sec < 10 ? '0' + sec : sec;
	const msecStr = msec < 10 ? '0' + msec : msec;
	
	return `${minStr}:${secStr}:${msecStr}`
}