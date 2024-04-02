// components/PuzzleGrid.js
import React, { useState } from 'react';
import Sudoku from './puzzles/Sudoku';
import TicTacToe from './puzzles/TicTacToe';
import Twenty48 from './puzzles/Twenty48';

function PuzzleGrid({ difficulty, showComponent, setShowComponent, seconds, setSeconds }) {

  const handleStartClick = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    setShowComponent(randomIndex)
  };


  return (
    <div className="puzzle-grid">
      {showComponent === undefined && <button onClick={handleStartClick}>Start Random Game</button>}
      {showComponent === 0 ?
        <>
          <p>Sudoku puzzle grid.</p>
          <Sudoku difficulty={difficulty} seconds={seconds} setShowComponent={setShowComponent} setSeconds={setSeconds} />
        </> : false
      }
      {showComponent === 1 ?
        <>
          <p>Tic-Tac-Toe puzzle grid.</p>
          <TicTacToe difficulty={difficulty} seconds={seconds} setShowComponent={setShowComponent} setSeconds={setSeconds} />
        </> : false
      }
      {showComponent === 2 ?
        <>
          <p>2048 puzzle grid.</p>
          <Twenty48 difficulty={difficulty} seconds={seconds} setShowComponent={setShowComponent} setSeconds={setSeconds} />
        </> : false
      }
    </div >
  );
}

export default PuzzleGrid;


