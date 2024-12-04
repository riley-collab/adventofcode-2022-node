const fs = require("fs");

// // Reading the input file
const input = fs.readFileSync("test1.txt", "utf-8").split("\n");
// console.log(input);

// get total visible from the edges

function countVisibleTrees(arr) {
  let count = 0;
  const numRows = arr.length;
  const numCols = arr[0].length;
  const maxValues = new Array(numCols).fill(-Infinity);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // gets the total visible from the edges
      const element = arr[i][j];

      if (i === 0 || j === 0 || i === numRows - 1 || j === arr[i].length - 1)
        count++;
      else if (element >= Math.max(...arr[i])) {
        console.log(...arr[i]);
        count++;
      } else if (element >= Math.max(...arr[j])) {
        console.log("test");
        count++;
      }
      //   console.log(element);
    }
  }
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      // Update the max value for the column
      if (arr[row][col] > maxValues[col]) {
        maxValues[col] = arr[row][col];
        count++;
      }
    }
  }
  //   const n = numRows;
  //   return n;
  return count;
}

console.log(countVisibleTrees(input));
