// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

/*function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return console.log(letterPoints);
}*/

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let newPointStructure = {};

function transform(object) {
   let newPointObj = {};
   for (let k in object) {
      for (let i = 0; i < object[k].length; i++) {
         newPointObj[(object[k][i]).toLowerCase()] = Number(k);
      }
   }

   return newPointObj;
};


newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;


let word = "";


let simpleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   let pointValue = 1;

   for (let i = 0; i < word.length; i++) {
      letterPoints += pointValue;
   }
   return letterPoints;
}

let vowelBonusScorer = function (word) {
   word = word.toLowerCase();
   let pointValue = 0;
   let letterPoints = 0;
   let vowel = ['a', 'e', 'i', 'o', 'u'];
   for (let i = 0; i < word.length; i++) {
      if (vowel.includes(word[i])) {
         pointValue = 3;
      } else {
         pointValue = 1;
      }
      letterPoints += pointValue;
   }
   return letterPoints;
}



let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      letterPoints += newPointStructure[word[i]];
   }

   return letterPoints;
};

function initialPrompt() {
   let word = input.question("Let's play some scrabble!\n Enter a word: ");

   return word;
};

let simpleScore = {
   name: "Simple Score",
   description: "each letter is 1 point.",
   scoringFunction: simpleScorer,
};

let bonusVowel = {
   name: "Vowel Bonus Scorer",
   description: "each vowel is 3 points, and consonants are 1 point.",
   scoringFunction: vowelBonusScorer,
};

let scrabble = {
   name: "Scrabble",
   description: "the traditional scoring one",
   scoringFunction: scrabbleScorer,
};



const scoringAlgorithms = [simpleScore, bonusVowel, scrabble];

function scorerPrompt() {
   let userInput = input.question(`Which scoring algorithm would you like to use?\n
   0 - Simple: One point per character\n
   1 - Vowel Bonus: Vowels are worth 3 points\n
   2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2:  `);
   for (let i = 0; i < userInput.length; i++) {
      if (userInput == 0) {
         return scoringAlgorithms[0];
      } else if (userInput == 1) {
         return scoringAlgorithms[1];
      } else {
         userInput == 2;
         return scoringAlgorithms[2];
      }
   }
   return;
}

function runProgram() {
   let word = initialPrompt();
   transform();

   let score = scorerPrompt();

   console.log(`Score for ${word}: ${score.scoringFunction(word)}`);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
