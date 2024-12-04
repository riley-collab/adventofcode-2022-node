const fs = require("fs");

// Reading the input file
const input = fs.readFileSync("test1.txt", "utf-8").split("\n");
const input2 = fs.readFileSync("input.txt", "utf-8").split("\n");

// console.log(input);

function part1(arr) {
  for (let index = 3; index < arr.length; index++) {
    const one = arr[index - 3];
    const two = arr[index - 2];
    const three = arr[index - 1];
    const four = arr[index];
    const curr = one + two + three + four;
    console.log(curr.split(""));
    const charCount = curr.split("").reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;

      return acc;
    }, {});
    let count = 0;
    for (const key in charCount) {
      if (charCount[key] > 1) count++;
    }
    if (count === 0) return index + 1;
  }
}

function part2(arr) {
  //   console.log(arr.length);
  for (let index = 14; index < arr.length; index++) {
    const curr = [];
    // console.log(index);
    // console.log(arr);

    for (let iterator = index - 14; iterator < index; iterator++) {
      //   console.log(arr);
      //   console.log(iterator);
      curr.push(arr[iterator]);
    }
    // console.log(curr);
    const charCount = curr.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;

      return acc;
    }, {});
    let count = 0;
    for (const key in charCount) {
      if (charCount[key] > 1) count++;
    }
    // console.log(count);
    if (count === 0) console.log(charCount);
    if (count === 0) return index;
  }
}
for (const iterator of input) {
  //   console.log("Part1: ", part1(iterator));
}
for (const index of input2) {
  console.log("Part2:", part2(index));
}
