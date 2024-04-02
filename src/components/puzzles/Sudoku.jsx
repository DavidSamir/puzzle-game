import React, { useState, useEffect } from 'react';

function Sudoku({ difficulty, seconds, setShowComponent, setSeconds }) {
  const [grid, setGrid] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState([]);


  useEffect(() => {
    const generatedGrid = generateSudoku(difficulty);
    setGrid(generatedGrid);
  }, [difficulty]);

  const generateSudoku = (difficulty) => {
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
    const inputValue = e.target.value !== '' ? parseInt(e.target.value, 10) : '';
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = inputValue;
    setGrid(newGrid);

    const isValidPlacement = isValidNumber(newGrid, rowIndex, colIndex, inputValue);
    setHighlightedCells([{ row: rowIndex, col: colIndex, isValid: isValidPlacement }]);
  };
  const isValidNumber = (grid, row, col, num) => {
    if (num === '') return true;

    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num && i !== col) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num && i !== row) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num && (i !== row || j !== col)) {
          return false;
        }
      }
    }
    return true;
  };


  const calculateScore = () => {
    const timeTaken = seconds;
    const incorrectCells = highlightedCells.filter(cell => !cell.isValid).length;
    const emptyCells = grid.reduce((acc, row) => acc + row.filter(cell => cell === 0).length, 0);
    return {
      time: timeTaken,
      incorrectCells: incorrectCells,
      emptyCells: emptyCells,
      date:new Date(),
      data: grid
    }
  };
  const saveScore = () => {
    let scores = JSON.parse(localStorage.getItem('sudokuScore')) || [];
    const score = calculateScore();
    console.log(scores)
    scores.push(score);
    localStorage.setItem('sudokuScore', JSON.stringify(scores));
    setShowComponent(undefined)
    setSeconds(0)
  };



  return (
    <div className="puzzle-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${highlightedCells.some(cell => cell.row === rowIndex && cell.col === colIndex && !cell.isValid) ? 'incorrect' : ''}`}>
              {cell !== 0 ? (
                cell
              ) : (
                <input
                  type="text"
                  maxLength="1"
                  className={`nos ${highlightedCells.some(cell => cell.row === rowIndex && cell.col === colIndex && !cell.isValid) ? 'incorrect' : ''}`}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <p onClick={() => { saveScore() }}> save </p>
    </div>
  );
}

export default Sudoku;
