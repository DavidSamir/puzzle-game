import React, { useState, useEffect } from 'react';

const NonogramPuzzle = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState([]);

  useEffect(() => {
    let puzzleData;
    switch (difficulty) {
      case 'easy':
        puzzleData = [
          [0, 1, 1, 0],
          [1, 0, 0, 1],
          [1, 0, 0, 1],
          [0, 1, 1, 0]
        ];
        break;
      case 'medium':
        puzzleData = [
          [1, 1, 0, 0, 1],
          [1, 0, 1, 0, 1],
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [1, 1, 0, 1, 1]
        ];
        break;
      case 'hard':
        puzzleData = [
          [0, 1, 1, 1, 1, 0],
          [1, 0, 1, 1, 0, 1],
          [1, 1, 0, 0, 1, 1],
          [1, 1, 0, 0, 1, 1],
          [1, 0, 1, 1, 0, 1],
          [0, 1, 1, 1, 1, 0]
        ];
        break;
      default:
        // Default to easy level
        puzzleData = [
          [0, 1, 1, 0],
          [1, 0, 0, 1],
          [1, 0, 0, 1],
          [0, 1, 1, 0]
        ];
        break;
    }
    setPuzzle(puzzleData);
  }, [difficulty]);

  const toggleCell = (rowIndex, cellIndex) => {
    const newPuzzle = puzzle.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === cellIndex ? (cell === 0 ? 1 : 0) : cell)) : row
    );
    setPuzzle(newPuzzle);
  };

  return (
    <div>
      <h2>Nonogram Puzzle</h2>
      <div className="puzzle-board">
        {puzzle.map((row, rowIndex) => (
          <div key={rowIndex} className="puzzle-row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`puzzle-cell ${cell === 1 ? 'filled' : ''}`}
                onClick={() => toggleCell(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

};

export default NonogramPuzzle;
