// components/NonogramGenerator.js
function generateNonogram(difficulty) {
    // Define puzzle sizes for each difficulty level
    const puzzleSizes = {
      easy: { rows: 5, cols: 5 },
      medium: { rows: 10, cols: 10 },
      hard: { rows: 15, cols: 15 },
    };
  
    // Define the ratio of filled cells for each difficulty level
    const filledCellRatios = {
      easy: 0.3,
      medium: 0.5,
      hard: 0.7,
    };
  
    // Function to generate a Nonogram puzzle grid
    const generateGrid = (rows, cols, filledRatio) => {
      const grid = [];
      for (let i = 0; i < rows; i++) {
        grid.push(Array.from({ length: cols }, () => Math.random() < filledRatio ? 1 : 0));
      }
      return grid;
    };
  
    // Generate puzzle grid based on difficulty level
    const { rows, cols } = puzzleSizes[difficulty];
    const filledRatio = filledCellRatios[difficulty];
    const puzzleGrid = generateGrid(rows, cols, filledRatio);
  
    return puzzleGrid;
  }
  
  export default generateNonogram;
  