const fs = require("fs");

// Reading the input file

/* the trailing and leading white spaces have been removed,
and have been placed in an object iterated by the spaces for each Elf */
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n");

// console.log(input);
let temp = 0; // create a temp variable that will be reset
let max = 0; // create a max variable that we will keep
let maxArray = [];

let firstPart = input
  .map((element) => {
    let calories = element.split("\n").map(Number);

    return calories.reduce((prev, next) => prev + next, 0);
  })
  .flat();

console.log("First Part:", Math.max(...firstPart));

let secondPart = firstPart
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prev, next) => prev + next, 0);

console.log("Second Part:", secondPart);

// runs through the input file, by each Elf
input.forEach((element) => {
  // converts to a numbered array by elf
  let numberArray = element.split("\n").map(Number);

  // console.log(numberArray);
  // console.log(Math.max(...numberArray));
  // sums the calories for each elf with the temp variable
  for (const iterator of numberArray) {
    temp += iterator;
  }

  // check if the elf has the most calories, if so it becomes our new "local" max calories
  // resets the temp variable for the next elf
  if (temp < max) {
    temp = 0;
  } else {
    max = temp;
    temp = 0;
    maxArray.push(max);
  }
});
console.log("Part 1:", max);

// sorts through the array in descending order,
// when b - a is positive, b comes before a, leading to a sort from highest to lowest.
// takes the top 3 of the array
maxArray.sort((a, b) => b - a).slice(0, 3);
let sumMaxArray = 0;

// the sum of the top 3 calories for the elves
for (const iterator of maxArray) {
  sumMaxArray += iterator;
}
console.log("Part2:", sumMaxArray);

// someone elses solution which was used for testing purposes
const input2 = fs.readFileSync("input.txt", "utf-8");

const sum = (prev, curr) => prev + curr;
let data = input2
  .trim()
  .split(/\r?\n\r?\n/)
  .map((elf) =>
    elf
      .split(/\r?\n/)
      .map((x) => parseInt(x))
      .reduce(sum, 0)
  )
  .sort((a, b) => a - b);
let part1 = data.at(-1);
let part2 = data.slice(-3).reduce(sum, 0);

console.log(part1, part2);
