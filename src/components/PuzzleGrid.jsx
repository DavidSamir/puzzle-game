// components/PuzzleGrid.js
import React from 'react';
import Sudoku from './puzzles/Sudoku';

function PuzzleGrid({ difficulty }) {
  // Puzzle grid logic goes here
  return (
    <div className="puzzle-grid">
      {/* Display the puzzle grid */}
      <p>This is the puzzle grid.</p>
      <Sudoku/>
    </div>
  );
}

export default PuzzleGrid;
