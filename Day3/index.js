const fs = require("fs");

// Reading the input file
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
/*Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52. */

// create a function that splits the two compartments
// create a function that will find the shared item between compartments
// get the sum of the priorities

// create a conditonal statement to find if its lower or uppercase
// use ascii values to determine alphabet positioning

// create a mapping for points between lower and upper
const alphabetMap = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// create a function that splits the two compartments and finds the shared item between the compartments
function splitParts(string) {
  let length = string.length;
  let firstCompartment = string.slice(0, length / 2);
  let secondCompartment = string.slice(length / 2);
  // loop through one component using the other
  for (const iterator of firstCompartment) {
    if (secondCompartment.match(iterator)) {
      return secondCompartment.match(iterator);
    }
  }
}

let prioritiesSum = 0;
for (const iterator of input) {
  prioritiesSum += alphabetMap.indexOf(splitParts(iterator));
}

console.log("Part 1:", prioritiesSum);

let totalPriorityPart2 = 0;

for (let i = 0; i < input.length; i += 3) {
  const [sack1, sack2, sack3] = input.slice(i, i + 3).map((s) => new Set(s));

  for (const item of sack1) {
    if (sack2.has(item) && sack3.has(item)) {
      totalPriorityPart2 += alphabetMap.indexOf(item);
      break;
    }
  }
}

console.log("Part 2:", totalPriorityPart2);
