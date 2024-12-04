const fs = require("fs");

// Reading the input file
const input = fs.readFileSync("test1.txt", "utf-8").split("\n");
const input2 = fs.readFileSync("input.txt", "utf-8").split("\n\n");

// Function to parse the initial stacks of crates
function parseStacks(stackInput) {
  const stackLines = stackInput.split("\n");
  const stackCount = (stackLines[stackLines.length - 1].match(/\d+/g) || [])
    .length;
  const stacks = Array.from({ length: stackCount }, () => []);

  //   for (let i = stackLines.length - 2; i >= 0; i--) {
  //     const line = stackLines[i];
  //     let stackIndex = 0;
  //     for (let j = 1; j < line.length; j += 4) {
  //       const crate = line[j];
  //       if (crate !== " ") {
  //         stack2[stackIndex].push(crate);
  //       }
  //       stackIndex++;
  //     }
  //   }
  for (let i = 0; i <= stackLines.length - 2; i++) {
    const line = stackLines[i];
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
const stacks = parseStacks(input2[0]);
const instructions = parseInstructions(input2[1]);

function clearEmpty(array) {
  const newArray = [];
  array.map((element) => {
    if (element && element !== " ") newArray.push(element);
  });
  return newArray;
}

function move(arrayFrom, arrayTo, amount) {
  const element = [];
  for (let index = 0; index < amount; index++) {
    //   for (let index = amount - 1; index >= 0; index--) {
    element.push(arrayFrom[index]);
    arrayFrom[index] = " ";
  }
  arrayTo.forEach((index) => {
    element.push(index);
  });

  return element;
}
console.log(stacks);
instructions.forEach((element) => {
  console.log(element);
  const { count, from, to } = element;
  stacks[to] = move(stacks[from], stacks[to], count);
  stacks[from] = clearEmpty(stacks[from]);
});
console.log(stacks);

let part2 = "";
stacks.map((element) => {
  part2 += element[0];
});

console.log("Part2: ", part2);
