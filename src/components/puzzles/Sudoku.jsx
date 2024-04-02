import React, { useState, useEffect } from 'react';

function Sudoku({ difficulty }) {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Generate puzzle grid when component mounts
    const generatedGrid = generateSudoku(difficulty);
    setGrid(generatedGrid);
  }, [difficulty]);

  // Function to generate a Sudoku grid
  const generateSudoku = (difficulty) => {
    // Helper function to shuffle an array
    // const shuffleArray = (array) => {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    //   }
    //   return array;
    // };

    const isValidNumber = (grid, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
          return false;
        }
      }

      for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
          return false;
        }
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (grid[i][j] === num) {
            return false;
          }
        }
      }
      return true;
    };

    const solveSudoku = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValidNumber(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid)) {
                  return true;
                } else {
                  grid[row][col] = 0;
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const removeNumbers = (grid, difficulty) => {
      let count;
      switch (difficulty) {
        case 'easy':
          count = 40;
          break;
        case 'medium':
          count = 50;
          break;
        case 'hard':
          count = 60;
          break;
        default:
          count = 40;
      }
      while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
          grid[row][col] = 0;
          count--;
        }
      }
    };

    const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

    solveSudoku(emptyGrid);
    removeNumbers(emptyGrid, difficulty);

    return emptyGrid;
  };
  const handleInputChange = (e, rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = e.target.value !== '' ? parseInt(e.target.value, 10) : '';
    setGrid(newGrid);
  };
  return (
    <div className="puzzle-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell">
              {cell !== 0 ? (
                cell
              ) : (
                <input
                  type="text"
                  className='nos'
                  maxLength="1"
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sudoku;
