// components/PuzzleGrid.js
import React, { useState } from 'react';
import Sudoku from './puzzles/Sudoku';
import NonogramPuzzle from './puzzles/Nonogram';

function PuzzleGrid({ difficulty, showComponent, setShowComponent }) {
  const [randomComponent, setRandomComponent] = useState(null);

  const handleStartClick = () => {
    const randomIndex = Math.floor(Math.random() * 2);
    setShowComponent(randomIndex)
  };


  return (
    <div className="puzzle-grid">
      {!showComponent && <button onClick={handleStartClick}>Start</button>}
      {showComponent === 0 ?
        <>
          <p>Sudoku puzzle grid.</p>
          <Sudoku difficulty={difficulty} />
        </> : false
      }
      {showComponent === 1 ?
        <>
          <p>Nonogram puzzle grid.</p>
          <NonogramPuzzle difficulty={difficulty} />
        </> : false
      }
    </div >
  );
}

export default PuzzleGrid;


