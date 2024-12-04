const fs = require("fs");

// Reading the input file
const input = fs.readFileSync("test1.txt", "utf-8").split("\n\n");

// Function to parse the initial stacks of crates
function parseStacks(stackInput) {
  const stackLines = stackInput.split("\n");
  // console.log(stackLines);
  const stackCount = (stackLines[stackLines.length - 1].match(/\d+/g) || [])
    .length;
  // console.log(stackCount);
  const stacks = Array.from({ length: stackCount }, () => []);
  // console.log(stacks);
  for (let i = stackLines.length - 2; i >= 0; i--) {
    const line = stackLines[i];
    // console.log(line);
    let stackIndex = 0;
    for (let j = 1; j < line.length; j += 4) {
      const crate = line[j];
      if (crate !== " ") {
        stacks[stackIndex].push(crate);
      }
      stackIndex++;
    }
  }
  return stacks;
}

// Function to parse the instructions for moving crates
function parseInstructions(instructionInput) {
  return instructionInput
    .trim()
    .split("\n")
    .map((line) => {
      const [_, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
      line.match();
      return {
        count: parseInt(count),
        from: parseInt(from) - 1,
        to: parseInt(to) - 1,
      };
    });
}

// Function to move crates based on instructions (Part 1)
function moveCratesPart1(stacks, instructions) {
  for (const { count, from, to } of instructions) {
    for (let i = 0; i < count; i++) {
      const crate = stacks[from].pop();
      // console.log(crate);

      stacks[to].push(crate);
      // console.log(stacks[to]);
    }
  }
}

function move(arrayFrom, arrayTo, amount) {
  const element = [];
  for (let index = 0; index < amount; index++) {
    // element.push(arrayFrom[2]);
    // element.push(arrayFrom[1]);
    // element.push(arrayFrom[0]);
    // element.push(arrayTo);
    element.push(arrayFrom[index]);
    arrayFrom[index] = " ";
  }
  arrayTo.forEach((index) => {
    element.push(index);
  });
  return element;
}

// Parsing the input into stacks and instructions
const stacks = parseStacks(input[0]);
const instructions = parseInstructions(input[1]);
console.log(stacks);
// console.log("input:", input[0]);
const part2 = [];
for (const iterator of instructions) {
  const { from, to, count } = iterator;
  // console.log(from, to, count);
  part2.push(move(stacks[from], stacks[to], count));
}
// Make a deep copy of stacks for Part 2
const stacksPart2 = JSON.parse(JSON.stringify(stacks));

console.log(part2);
// Apply the instructions for Part 1
moveCratesPart1(stacks, instructions);
// console.log(instructions);

// Output the top crate of each stack
// console.log(stacks);
// console.log("Part 1:", stacks.map((stack) => stack[stack.length - 1]).join(""));
