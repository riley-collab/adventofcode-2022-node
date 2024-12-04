const fs = require("fs");

// Reading the input file
// match input with win condition
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
// console.log(input);

// come up with a strategy
/* 
rock (A)    = 1
paper (B)   = 2
scissors (C)= 3

lost        = 0
draw        = 3
win         = 6
*/

// create a function that determines who wins
function result(opponent, player) {
  switch (opponent) {
    case "A":
      if (player === "X") {
        return 3;
      } else if (player === "Y") {
        return 6;
      } else return 0;
    case "B":
      if (player === "X") {
        return 0;
      } else if (player === "Y") {
        return 3;
      } else return 6;
    default:
      if (player === "X") {
        return 6;
      } else if (player === "Y") {
        return 0;
      } else return 3;
  }
}

// create a function that determines who wins from the outcome
function determinePlayerHand(opponent, outcome) {
  switch (opponent) {
    case "A":
      if (outcome === "X") {
        return "Z";
      } else if (outcome === "Y") {
        return "X";
      } else return "Y";
    case "B":
      if (outcome === "X") {
        return "X";
      } else if (outcome === "Y") {
        return "Y";
      } else return "Z";
    default:
      if (outcome === "X") {
        return "Y";
      } else if (outcome === "Y") {
        return "Z";
      } else return "X";
  }
}

// function created to get the points based on what the player plays
function playerPoints(player) {
  switch (player) {
    case "X":
      return 1;
    case "Y":
      return 2;
    default:
      return 3;
  }
}

// lets create the scoring
// I want to loop through each of the elements and reading what it is
// position [0] lets me access what hand was played by the opponent, while
// position [2] lets me access what hand was played by me

// console.log(playerPoints(""));
// console.log(result("C", "Z"));
let score = 0;
for (const iterator of input) {
  //   console.log(iterator[2]);
  score += playerPoints(iterator[2]);
  score += result(iterator[0], iterator[2]);
}

console.log("Part 1:", score);

scorePart2 = 0;
for (const iterator of input) {
  //   console.log("iterator:", iterator);
  let playerHand = determinePlayerHand(iterator[0], iterator[2]);
  //   console.log("playerHand:", playerHand);
  scorePart2 += playerPoints(playerHand);
  scorePart2 += result(iterator[0], playerHand);
  //   console.log("myscore:", scorePart2);
}
console.log("Part 2:", scorePart2);

/*

X lost
Y draw
Z win
A Y // result is a draw, opponent plays a rock, therefore player needs to play a rock
B X // result is a loss, opponent plays paper, therefore the player needs to play a rock
C Z // result is a win, opponent plays a scizzors, therefore the player needs to play a rock

*/

// Scoring rules
const scoreMap = {
  "A X": 3 + 1, // Rock vs Rock (Draw + Rock)
  "A Y": 6 + 2, // Rock vs Paper (Win + Paper)
  "A Z": 0 + 3, // Rock vs Scissors (Loss + Scissors)
  "B X": 0 + 1, // Paper vs Rock (Loss + Rock)
  "B Y": 3 + 2, // Paper vs Paper (Draw + Paper)
  "B Z": 6 + 3, // Paper vs Scissors (Win + Scissors)
  "C X": 6 + 1, // Scissors vs Rock (Win + Rock)
  "C Y": 0 + 2, // Scissors vs Paper (Loss + Paper)
  "C Z": 3 + 3, // Scissors vs Scissors (Draw + Scissors)
};

// Calculate the total score
let totalScore = 0;
for (const game of input) {
  totalScore += scoreMap[game];
}

console.log("Part 1:", totalScore);

// Mapping for the move to make given the opponent's move and the desired outcome
const outcomeMap = {
  "A X": 0 + 3, // Rock -> Lose -> Scissors
  "A Y": 3 + 1, // Rock -> Draw -> Rock
  "A Z": 6 + 2, // Rock -> Win -> Paper
  "B X": 0 + 1, // Paper -> Lose -> Rock
  "B Y": 3 + 2, // Paper -> Draw -> Paper
  "B Z": 6 + 3, // Paper -> Win -> Scissors
  "C X": 0 + 2, // Scissors -> Lose -> Paper
  "C Y": 3 + 3, // Scissors -> Draw -> Scissors
  "C Z": 6 + 1, // Scissors -> Win -> Rock
};

// Calculate the total score based on desired outcomes
let totalScorePart2 = 0;
for (const game of input) {
  totalScorePart2 += outcomeMap[game];
}

console.log("Part 2:", totalScorePart2);
