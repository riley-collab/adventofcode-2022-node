const fs = require("fs");

// Reading the input file
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

// console.log(input);

function between(elf, min, max) {
  return elf[0] >= min && elf[0] <= max && elf[1] >= min && elf[1] <= max;
}
function overlap(elf, min, max) {
  return (elf[0] >= min && elf[0] <= max) || (elf[1] >= min && elf[1] <= max);
}
// just check the start and the end of each range
let firstPart = 0;
let secondPart = 0;

input.map((element) => {
  let firstElf = element.split(",")[0].split("-");
  let secondElf = element.split(",")[1].split("-");
  if (
    between(secondElf, Number(firstElf[0]), Number(firstElf[1])) ||
    between(firstElf, Number(secondElf[0]), Number(secondElf[1]))
  )
    firstPart += 1;
  if (overlap(secondElf, Number(firstElf[0]), Number(firstElf[1]))) {
    secondPart++;
  } else if (overlap(firstElf, Number(secondElf[0]), Number(secondElf[1]))) {
    secondPart++;
  }
});

console.log("First Part: ", firstPart);
console.log("Second Part: ", secondPart);

// // Function to check if one range fully contains another
// function isFullyContained(range1, range2) {
//   return (
//     (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
//     (range2[0] >= range1[0] && range2[1] <= range1[1])
//   );
// }

// let fullyContainedCount = 0;

// for (const line of input) {
//   const [range1, range2] = line
//     .split(",")
//     .map((range) => range.split("-").map(Number));
//   //   console.log(range1);
//   if (isFullyContained(range1, range2)) {
//     fullyContainedCount++;
//   }
// }

// console.log("Part 1:", fullyContainedCount);
