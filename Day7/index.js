const fs = require("fs");

// // Reading the input file
const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const input2 = fs.readFileSync("test1.txt", "utf-8").split("\n");

// console.log(input);

//first understand the directories
//get the total size of the directories
//compare total sizes

// Function to parse the input and calculate directory sizes
function parseInput(input) {
  const dirs = new Map(); // Store directory sizes
  const currentDir = []; // Track current directory path

  input.forEach((line) => {
    if (line.startsWith("$ cd")) {
      const dirName = line.split(" ")[2];
      if (dirName === "..") {
        currentDir.pop(); // Go up one level
      } else {
        currentDir.push(dirName); // Move into a new directory
      }
    } else if (line.startsWith("dir") || line.startsWith("$ ls")) {
      // Skip `ls` commands and directory listings
    } else {
      // Process files with sizes
      const fileSize = parseInt(line.split(" ")[0], 10);

      // Add the file size to current directory and all parent directories
      for (let i = 1; i <= currentDir.length; i++) {
        const path = currentDir.slice(0, i).join("/");
        dirs.set(path, (dirs.get(path) || 0) + fileSize);
      }
    }
  });

  return dirs;
}

// Function to calculate the total size of directories <= 100,000
function calculateSumOfSmallDirs(input) {
  const dirs = parseInput(input);
  let totalSize = 0;

  for (const size of dirs.values()) {
    if (size <= 100000) {
      totalSize += size;
    }
  }

  return totalSize;
}

// Calculate the total size of directories <= 100000
// const part1 = calculateSumOfSmallDirs(input);
// console.log("Total size of directories <= 100000:", part1);

function TotalSum(input) {
  const dirs = parseInput(input);
  let totalSize = dirs.get("/");

  return { totalSize, dirs };
}

const TotalAvailableDiskSpace = 70000000;
const unusedSpace = TotalAvailableDiskSpace - TotalSum(input).totalSize;
const spaceRequired = 30000000 - unusedSpace;
// console.log(spaceRequired);

// loop through to see which directories could be used and keep track of all of them,
// then sort and find the smallest one

// console.log(TotalSum(input).dirs);

function loopThru(dirs) {
  let smallestDirSize = Infinity;

  for (const size of dirs.values()) {
    if (size >= spaceRequired && size < smallestDirSize) {
      smallestDirSize = size;
    }
  }
  return smallestDirSize;
}

const part2 = loopThru(TotalSum(input).dirs);
console.log(("Part 2: ", part2));
