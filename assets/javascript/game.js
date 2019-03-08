var wordOptions = ['andresiniesta','cristianoronaldo','davidbeckham','diegomaradona','homaresawa','lionelmessi','marta','miahamm','pele','sunwen'];
var currentWord;
var lettersWord = [];
var hangmanLetters = [];

var wins = 0;
var guessesLeft = 9;
var lettersGuessed = [];
        
var winsTxt = document.getElementById("wins-txt");
var wordTxt = document.getElementById("word-txt");
var guessesLeftTxt = document.getElementById("guesses-left-txt");
var guessesSoFarTxt = document.getElementById("guesses-so-far-txt");
var answerTxt = document.getElementById("answer-txt");

resetGuesses();

document.addEventListener('keyup', userInput);
function userInput(event) {
	var userGuess = event.key.toLowerCase();
		
	if (hangmanLetters.indexOf("_") > -1 && guessesLeft > 1) { // word not complete and guesses left
		if (lettersWord.indexOf(userGuess) === -1 && lettersGuessed.indexOf(userGuess) === -1) { //if userGuess not in word and not in lettersGuessed
			guessesLeft--;
			guessesLeftTxt.textContent = "Number of guesses remaining: " + guessesLeft;
			lettersGuessed.push(userGuess);
			guessesSoFarTxt.textContent = "Letters already guessed: " + lettersGuessed.join(" ");
		} else if (lettersWord.indexOf(userGuess) === -1 && lettersGuessed.indexOf(userGuess) > -1) { //if userGuess not in word and already in lettersGuessed

		} else if (lettersWord.indexOf(userGuess) > -1) { // userGuess in word
			for (var i = 0; i < lettersWord.length; i++) {
				if (lettersWord[i] === userGuess) {
					hangmanLetters[i]=userGuess;
					//console.log(hangmanLetters);
					wordTxt.textContent = "Current word: " + hangmanLetters.join(" ");
				}
			}
			if (hangmanLetters.indexOf("_") === -1) { // if word completed
				wins++;
				winsTxt.textContent = "Wins: " + wins;
				answerTxt.textContent = "Score! It's " + currentWord.toUpperCase() + " with the finish!!!";
				resetGuesses();
			} 
		}
	} else if (hangmanLetters.indexOf("_") > -1 && guessesLeft === 1) { // word not complete and guesses run out
		answerTxt.textContent = "So close " + currentWord.toUpperCase() + ". :( Better luck next time!";
		resetGuesses();
	}
}

function resetGuesses() {
	guessesLeft = 9;
	lettersGuessed = [];
	hangmanLetters = [];

	guessesLeftTxt.textContent = "Number of guesses remaining: " + guessesLeft;
	guessesSoFarTxt.textContent = "Letters already guessed: ";

	currentWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	//console.log(currentWord);
	lettersWord = currentWord.split('');
	for (var i = 0; i < lettersWord.length; i++) {
		hangmanLetters.push("_")
	}
	wordTxt.textContent = "Current word: " + hangmanLetters.join(" ");
}